#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const TARGET_DIRS = ['app', 'components'];
const BACKUP_EXT = '.bak';
const FAQ_IMPORT_PATH = '@/components/utils/Faqs';

/**
 * Recursively find all .tsx files in the given directories
 */
function findTsxFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') return;
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Clean extracted HTML text to plain string for JSON
 */
function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Escape string for safe inclusion in JS/TS code
 */
function escapeString(str) {
  return JSON.stringify(str).slice(1, -1);
}

/**
 * Find matching closing tag for an opening tag at openIndex.
 * @param {string} content - Full content
 * @param {number} openIndex - Index of opening tag (including '<')
 * @param {string} tagName - Tag name without brackets (e.g., 'div', 'Card')
 * @returns {number} Index of closing tag's '>' char, or -1 if not found
 */
function findMatchingClosingTag(content, openIndex, tagName) {
  const openTagRegex = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, 'g');
  const closeTag = `</${tagName}>`;
  let depth = 1;
  let searchIndex = openIndex;

  while (searchIndex < content.length && depth > 0) {
    const remaining = content.slice(searchIndex);
    const nextOpenMatch = openTagRegex.exec(remaining);
    const nextCloseIndex = remaining.indexOf(closeTag);

    // Reset regex lastIndex for next iteration
    openTagRegex.lastIndex = 0;

    const nextOpenIndex = nextOpenMatch ? nextOpenMatch.index : -1;

    if (nextCloseIndex === -1) {
      break;
    }

    if (nextOpenIndex !== -1 && nextOpenIndex < nextCloseIndex) {
      depth++;
      searchIndex += nextOpenIndex + nextOpenMatch[0].length;
    } else {
      depth--;
      if (depth === 0) {
        return searchIndex + nextCloseIndex + closeTag.length;
      }
      searchIndex += nextCloseIndex + closeTag.length;
    }
  }
  return -1;
}

/**
 * Find and extract the FAQ Card section more carefully
 * This function finds the exact Card containing FAQs without affecting other content
 */
function extractAndReplaceFAQ(content) {
  let faqTitleIndex = content.indexOf('<CardTitle>Frequently Asked Questions</CardTitle>');
  let format = 'card'; // 'card', 'h2', 'h3'

  // Also check for h2 format - loop through all h2 tags to find FAQ title
  if (faqTitleIndex === -1) {
    let h2Index = content.indexOf('<h2');
    while (h2Index !== -1) {
      const h2Section = content.slice(h2Index, h2Index + 200);
      if (h2Section.includes('Frequently Asked Questions')) {
        faqTitleIndex = h2Index;
        format = 'h2';
        break;
      }
      h2Index = content.indexOf('<h2', h2Index + 1);
    }
  }

  // Also check for h3 format - loop through all h3 tags to find FAQ title
  if (faqTitleIndex === -1) {
    let h3Index = content.indexOf('<h3');
    while (h3Index !== -1) {
      const h3Section = content.slice(h3Index, h3Index + 200);
      if (h3Section.includes('Frequently Asked Questions')) {
        faqTitleIndex = h3Index;
        format = 'h3';
        break;
      }
      h3Index = content.indexOf('<h3', h3Index + 1);
    }
  }

  if (faqTitleIndex === -1) {
    return { content, hasChanges: false };
  }

  // Try to find Card wrapper first
  let wrapperOpenIndex = -1;
  let wrapperCloseIndex = -1;
  let wrapperContent = '';

  // Search backwards for Card opening tag
  const searchStart = Math.max(0, faqTitleIndex - 2000);
  const contentBefore = content.slice(searchStart, faqTitleIndex);
  const cardOpenMatches = [...contentBefore.matchAll(/<Card(?:\s[^>]*)?>/g)];
  if (cardOpenMatches.length > 0) {
    const lastCardOpen = cardOpenMatches[cardOpenMatches.length - 1];
    wrapperOpenIndex = searchStart + lastCardOpen.index;
    wrapperCloseIndex = findMatchingClosingTag(content, wrapperOpenIndex, 'Card');
    if (wrapperCloseIndex !== -1) {
      wrapperContent = content.slice(wrapperOpenIndex, wrapperCloseIndex);
    }
  }

  // If Card wrapper not found, try to find parent div wrapper
  if (wrapperCloseIndex === -1) {
    // Search backwards for a div opening tag (preferably with class containing "mt-8")
    const divOpenRegex = /<div[^>]*>/g;
    let divMatch;
    let bestDivIndex = -1;
    let bestDivTag = '';
    // Search within reasonable range before title
    const divSearchStart = Math.max(0, faqTitleIndex - 1000);
    const divSearchContent = content.slice(divSearchStart, faqTitleIndex);
    while ((divMatch = divOpenRegex.exec(divSearchContent)) !== null) {
      bestDivIndex = divMatch.index;
      bestDivTag = divMatch[0];
    }
    if (bestDivIndex !== -1) {
      wrapperOpenIndex = divSearchStart + bestDivIndex;
      wrapperCloseIndex = findMatchingClosingTag(content, wrapperOpenIndex, 'div');
      if (wrapperCloseIndex !== -1) {
        wrapperContent = content.slice(wrapperOpenIndex, wrapperCloseIndex);
      }
    }
  }

  if (wrapperCloseIndex === -1) {
    return { content, hasChanges: false };
  }

  // Use wrapper indices (keep variable names for compatibility)
  const cardOpenIndex = wrapperOpenIndex;
  const cardCloseIndex = wrapperCloseIndex;
  const faqCardContent = wrapperContent;

  // Extract Q&A pairs from the FAQ Card
  const faqs = [];
  // Match both <h3> and <h4> tags for questions, with flexible className patterns
  const qaRegex = /<div[\s\n]*>[\s\n]*<(?:h3|h4)[^>]*>([\s\S]*?)<\/(?:h3|h4)>[\s\n]*<p[^>]*>([\s\S]*?)<\/p>[\s\n]*<\/div>/g;
  let qaMatch;

  while ((qaMatch = qaRegex.exec(faqCardContent)) !== null) {
    const question = cleanText(qaMatch[1]);
    const answer = cleanText(qaMatch[2]);

    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  if (faqs.length === 0) {
    // Try a more lenient regex
    const qaRegex2 = /<div[^>]*>[\s\n]*<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\n]*<p[^>]*>([\s\S]*?)<\/p>[\s\n]*<\/div>/g;
    while ((qaMatch = qaRegex2.exec(faqCardContent)) !== null) {
      const question = cleanText(qaMatch[1]);
      const answer = cleanText(qaMatch[2]);
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  if (faqs.length === 0) {
    return { content, hasChanges: false };
  }
  
  // Build the new FAQ section
  const faqsArrayString = faqs.map(f => `{
    question: "${escapeString(f.question)}",
    answer: "${escapeString(f.answer)}",
  }`).join(',\n');
  
  const newSection = `<section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
${faqsArrayString}
  ]} />
</section>`;
  
  // Replace only the FAQ Card section with the new section
  const newContent = content.slice(0, cardOpenIndex) + newSection + content.slice(cardCloseIndex);
  
  return { content: newContent, hasChanges: true };
}

/**
 * Add import statement if not already present
 */
function addImport(content) {
  const importStatement = `import Faqs from "${FAQ_IMPORT_PATH}";\n`;
  
  if (content.includes(`from "${FAQ_IMPORT_PATH}"`) || content.includes(`from '${FAQ_IMPORT_PATH}'`)) {
    return content;
  }
  
  // Find the last import line
  const importRegex = /^(import\s.+;)$/gm;
  const matches = [...content.matchAll(importRegex)];
  
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const insertIndex = lastMatch.index + lastMatch[0].length;
    return content.slice(0, insertIndex) + '\n' + importStatement + content.slice(insertIndex);
  } else {
    // No imports found, add at top
    if (content.startsWith('"use client"')) {
      return content.replace('"use client"', '"use client";\n' + importStatement);
    } else {
      return importStatement + content;
    }
  }
}

/**
 * Process a single file
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Extract and replace FAQ section
  const result = extractAndReplaceFAQ(content);

  if (!result.hasChanges) {
    return; // No FAQs found or couldn't parse
  }

  content = result.content;

  // Add import if needed
  content = addImport(content);

  // Backup and write
  const backupPath = filePath + BACKUP_EXT;
  fs.writeFileSync(backupPath, originalContent);

  fs.writeFileSync(filePath, content);

  console.log(`  ✅ Migrated: ${filePath}`);
  console.log(`  💾 Backup: ${backupPath}`);
}

/**
 * Main Execution
 */
function main() {
  console.log('🔍 Starting FAQ Migration Script...\n');

  let totalFiles = 0;
  let migratedFiles = 0;

  TARGET_DIRS.forEach(dir => {
    const absoluteDir = path.join(process.cwd(), dir);
    const files = findTsxFiles(absoluteDir);

    files.forEach(file => {
      totalFiles++;
      const contentBefore = fs.readFileSync(file, 'utf8');
      processFile(file);
      const contentAfter = fs.readFileSync(file, 'utf8');

      if (contentBefore !== contentAfter) {
        migratedFiles++;
      }
    });
  });

  console.log(`\n🏁 Migration Complete.`);
  console.log(`   Scanned: ${totalFiles} files`);
  console.log(`   Migrated: ${migratedFiles} files`);
  console.log(`\n⚠️  Please verify the changes and test your build before committing.`);
  console.log(`   Backup files (.bak) have been created. You can delete them after verification.`);
}

main();