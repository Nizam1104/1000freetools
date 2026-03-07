#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

if (!folderPath) {
  console.error("Usage: node remove-empty-section.js <folder-path>");
  process.exit(1);
}

if (!fs.existsSync(folderPath)) {
  console.error(`Folder not found: ${folderPath}`);
  process.exit(1);
}

function removeSection(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Match <section ...> that contains only whitespace </section>
  const pattern = /[ \t]*<section[^>]*>\s*<\/section>/g;

  const before = content;
  let updated = content.replace(pattern, "");

  if (updated === before) {
    console.log(`⏭️  No empty section found: ${filePath}`);
    return;
  }

  // Clean up extra blank lines
  updated = updated.replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`✅ Removed empty section: ${filePath}`);
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name === "page.tsx") {
      removeSection(fullPath);
    }
  }
}

console.log(`🔍 Scanning folder: ${folderPath}\n`);
walkDir(folderPath);
console.log("\n✨ Done!");
