#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const TARGET_DIRS = ['app', 'components'];
const BACKUP_EXT = '.bak';
const FAQ_IMPORT_PATH = '@/components/utils/Faqs';

// Regex Patterns
// 1. Finds the Card block containing "Frequently Asked Questions"
// We use a non-greedy match for the content, assuming </Card> closes this specific card.
const FAQ_CARD_REGEX = /(<Card\s[^>]*>[\s\S]*?<CardHeader>[\s\S]*?<CardTitle>Frequently Asked Questions<\/CardTitle>[\s\S]*?<\/Card>)/g;

// 2. Finds individual Q&A pairs inside the CardContent
// Looks for the specific h3/p structure provided in your example
const QA_ITEM_REGEX = /<div>[\s\n]*<h3[^>]*>([\s\S]*?)<\/h3>[\s\n]*<p[^>]*>([\s\S]*?)<\/p>[\s\n]*<\/div>/g;

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
      // Skip node_modules and .next
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
    .replace(/<[^>]+>/g, '') // Remove any remaining tags if nested
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Escape string for safe inclusion in JS/TS code
 */
function escapeString(str) {
  // We use JSON.stringify to handle quotes, newlines, etc., then remove the surrounding quotes
  return JSON.stringify(str).slice(1, -1);
}

/**
 * Process a single file
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let hasChanges = false;

  // 1. Check if file has the FAQ Card pattern
  if (!FAQ_CARD_REGEX.test(content)) {
    return; // No FAQs found in this file
  }

  console.log(`Processing: ${filePath}`);

  // 2. Replace FAQ Cards
  content = content.replace(FAQ_CARD_REGEX, (match) => {
    const faqs = [];
    
    // Reset lastIndex for nested regex
    QA_ITEM_REGEX.lastIndex = 0;
    let qaMatch;

    // Extract Q&A pairs from the matched Card block
    while ((qaMatch = QA_ITEM_REGEX.exec(match)) !== null) {
      const question = cleanText(qaMatch[1]);
      const answer = cleanText(qaMatch[2]);
      
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }

    if (faqs.length === 0) {
      console.warn(`  ⚠️ Found FAQ Card but could not parse questions/answers in ${filePath}`);
      return match; // Return original if parsing fails
    }

    // Build the new JSX section
    const faqsArrayString = faqs.map(f => `{
    question: "${escapeString(f.question)}",
    answer: "${escapeString(f.answer)}",
  }`).join(',\n');

    const newSection = `
<section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
${faqsArrayString}
  ]} />
</section>`;

    hasChanges = true;
    return newSection;
  });

  // 3. Handle Imports
  if (hasChanges) {
    const importStatement = `import Faqs from "${FAQ_IMPORT_PATH}";\n`;
    
    // Check if import already exists
    if (!content.includes(`from "${FAQ_IMPORT_PATH}"`) && !content.includes(`from '${FAQ_IMPORT_PATH}'`)) {
      // Find the last import line to insert after
      const importRegex = /^(import\s.+;)$/gm;
      const lastImportMatch = [...content.matchAll(importRegex)].pop();
      
      if (lastImportMatch) {
        const insertIndex = lastImportMatch.index + lastImportMatch[0].length;
        content = content.slice(0, insertIndex) + '\n' + importStatement + content.slice(insertIndex);
      } else {
        // If no imports found, add at top (after "use client" if present)
        if (content.startsWith('"use client"')) {
           content = content.replace('"use client"', '"use client";\n' + importStatement);
        } else {
           content = importStatement + content;
        }
      }
      console.log(`  ✅ Added import for Faqs`);
    }

    // 4. Backup and Write
    const backupPath = filePath + BACKUP_EXT;
    fs.writeFileSync(backupPath, originalContent);
    console.log(`  💾 Backup created: ${backupPath}`);
    
    fs.writeFileSync(filePath, content);
    console.log(`  ✨ Migrated successfully`);
  }
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