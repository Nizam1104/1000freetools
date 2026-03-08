#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const MAPPINGS_PATH = path.join(__dirname, "../page-canonical-mappings.json");
const DRY_RUN = process.argv.includes("--dry-run");

// Read the mappings
const mappings = JSON.parse(fs.readFileSync(MAPPINGS_PATH, "utf8"));

// Function to add canonical metadata to a page file
function addCanonicalMetadata(filePath, canonicalUrl) {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Check if metadata already exists
  const hasMetadata = /export\s+const\s+metadata\s*:\s*Metadata/m.test(content);
  const hasAlternates = /alternates:\s*\{/m.test(content);
  const hasCanonical = /canonical:\s*["']/m.test(content);

  // If canonical already exists, skip
  if (hasCanonical) {
    console.log(`  ⏭️  Canonical already exists, skipping`);
    return false;
  }

  // Generate the metadata export block
  const metadataExportBlock = `
export const metadata: Metadata = {
    alternates: {
        canonical: "${canonicalUrl}",
    }
};
`;

  if (!hasMetadata) {
    // Need to add Metadata import and metadata export
    // Check if Metadata type is already imported
    const hasMetadataImport = /import\s+type\s+\{\s*Metadata\s*\}\s+from\s+["']next["']/m.test(content);
    
    if (!hasMetadataImport) {
      // Add Metadata import after "use client" directive if present, or at the beginning
      if (content.startsWith('"use client"')) {
        content = content.replace(
          /^("use client";?\s*\n)/,
          `$1import type { Metadata } from "next";\n`
        );
      } else {
        content = `import type { Metadata } from "next";\n${content}`;
      }
    }
    
    // Find ALL import statements and insert metadata after the last one
    // Match both regular imports and type imports
    const importRegex = /^(import\s+(?:type\s+)?(?:\{[\s\S]*?\}|\*\s+as\s+\w+|\w+)\s+from\s+["'].*["'];?\s*\n)+/m;
    const importMatch = content.match(importRegex);
    
    if (importMatch) {
      const insertPos = importMatch.index + importMatch[0].length;
      content = content.slice(0, insertPos) + metadataExportBlock + content.slice(insertPos);
    } else {
      // No imports found, add after "use client" or at beginning
      if (content.startsWith('"use client"')) {
        const newlineAfterDirective = content.indexOf('\n', 12) + 1;
        content = content.slice(0, newlineAfterDirective) + metadataExportBlock + content.slice(newlineAfterDirective);
      } else {
        content = metadataExportBlock + content;
      }
    }
  } else if (!hasAlternates) {
    // Metadata exists but no alternates, add alternates
    content = content.replace(
      /(export\s+const\s+metadata:\s*Metadata\s*=\s*\{)/m,
      `$1\n    alternates: {\n        canonical: "${canonicalUrl}",\n    },`
    );
  }

  if (DRY_RUN) {
    console.log(`  📝 Would add canonical: ${canonicalUrl}`);
    return true;
  }

  // Write the updated content
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  ✅ Added canonical: ${canonicalUrl}`);
  return true;
}

// Main function
function main() {
  console.log("🔧 Adding canonical metadata to pages...\n");
  
  if (DRY_RUN) {
    console.log("⚠️  DRY RUN MODE - No files will be modified\n");
  }
  
  const entries = Object.entries(mappings);
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const [filePath, { duplicateUrl, canonicalUrl }] of entries) {
    console.log(`📄 ${duplicateUrl}`);
    
    const result = addCanonicalMetadata(filePath, canonicalUrl);
    
    if (result === true) {
      successCount++;
    } else if (result === false) {
      skipCount++;
    } else {
      errorCount++;
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ Processing complete!");
  console.log(`📊 Total pages: ${entries.length}`);
  console.log(`📊 Updated: ${successCount}`);
  console.log(`📊 Skipped: ${skipCount}`);
  console.log(`📊 Errors: ${errorCount}`);
  
  if (DRY_RUN) {
    console.log("\n⚠️  This was a dry run. Run without --dry-run to apply changes.");
  }
  console.log("=".repeat(60));
}

// Run the script
main();
