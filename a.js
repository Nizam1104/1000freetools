#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

if (!folderPath) {
  console.error("Usage: node fix-hrefs.js <folder-path>");
  process.exit(1);
}

if (!fs.existsSync(folderPath)) {
  console.error(`Folder not found: ${folderPath}`);
  process.exit(1);
}

function fixHrefsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Match href values inside the tools array objects
  // Matches: "href": "/something" or href: "/something"
  const hrefRegex = /"href":\s*"(\/[^"]*)"/g;

  let changed = false;
  const updated = content.replace(hrefRegex, (match, hrefValue) => {
    // If already starts with /calculators/, leave it alone
    if (hrefValue.startsWith("/calculators/")) {
      return match;
    }
    // Otherwise, prefix with /calculators
    const newHref = `/calculators${hrefValue}`;
    console.log(`  ${hrefValue}  →  ${newHref}`);
    changed = true;
    return `"href": "${newHref}"`;
  });

  if (changed) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed: ${filePath}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name === "layout.tsx") {
      console.log(`\n📄 Processing: ${fullPath}`);
      fixHrefsInFile(fullPath);
    }
  }
}

console.log(`🔍 Scanning folder: ${folderPath}\n`);
walkDir(folderPath);
console.log("\n✨ Done!");
