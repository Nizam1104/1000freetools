#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

if (!folderPath) {
  console.error("Usage: node remove-related-tools.js <folder-path>");
  process.exit(1);
}

if (!fs.existsSync(folderPath)) {
  console.error(`Folder not found: ${folderPath}`);
  process.exit(1);
}

function removeRelatedToolsSection(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Match the <h3> with "Related tools" (any whitespace/className variations)
  // followed by the <ul> block right after it, including all nested <li> items
  // Strategy: find the h3 tag, then find the closing </ul> that follows it
  const pattern =
    /[ \t]*<h3[^>]*>\s*Related tools\s*<\/h3>\s*\n?\s*<ul[\s\S]*?<\/ul>/g;

  const before = content;
  const updated = content.replace(pattern, "");

  if (updated !== before) {
    // Clean up any double blank lines left behind
    const cleaned = updated.replace(/\n{3,}/g, "\n\n");
    fs.writeFileSync(filePath, cleaned, "utf8");
    console.log(`✅ Removed related tools section: ${filePath}`);
  } else {
    console.log(`⏭️  No related tools section found: ${filePath}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name === "page.tsx") {
      removeRelatedToolsSection(fullPath);
    }
  }
}

console.log(`🔍 Scanning folder: ${folderPath}\n`);
walkDir(folderPath);
console.log("\n✨ Done!");
