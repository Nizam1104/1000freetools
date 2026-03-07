#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

if (!folderPath) {
  console.error("Usage: node remove-related-color-tools.js <folder-path>");
  process.exit(1);
}

if (!fs.existsSync(folderPath)) {
  console.error(`Folder not found: ${folderPath}`);
  process.exit(1);
}

function removeSection(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Find the outer <div> that contains an h2 with "Related" in it
  // We'll locate the start of the div, then count opening/closing div tags
  // to find the exact matching closing </div>

  // Find the h2 with "Related" text
  const h2Match = content.match(/<h2[^>]*>\s*[\s\S]*?Related[\s\S]*?<\/h2>/);
  if (!h2Match) {
    console.log(`⏭️  No related section found: ${filePath}`);
    return;
  }

  const h2Index = content.indexOf(h2Match[0]);

  // Walk backwards from h2 to find the opening <div> that wraps it
  const beforeH2 = content.substring(0, h2Index);
  const lastDivOpen = beforeH2.lastIndexOf("<div");
  if (lastDivOpen === -1) {
    console.log(`⏭️  Could not find wrapping <div>: ${filePath}`);
    return;
  }

  // Now from lastDivOpen, count div depth to find the matching </div>
  let depth = 0;
  let i = lastDivOpen;
  let endIndex = -1;

  while (i < content.length) {
    if (content.startsWith("<div", i)) {
      // Make sure it's a real tag (not e.g. <divider>)
      const charAfter = content[i + 4];
      if (
        charAfter === ">" ||
        charAfter === " " ||
        charAfter === "\n" ||
        charAfter === "\r" ||
        charAfter === "/"
      ) {
        depth++;
        i += 4;
        continue;
      }
    }
    if (content.startsWith("</div>", i)) {
      depth--;
      if (depth === 0) {
        endIndex = i + "</div>".length;
        break;
      }
      i += 6;
      continue;
    }
    i++;
  }

  if (endIndex === -1) {
    console.log(`⏭️  Could not find closing </div>: ${filePath}`);
    return;
  }

  // Remove the entire block including any leading whitespace/newline
  let start = lastDivOpen;
  // Also eat the newline/spaces before the opening <div>
  while (
    start > 0 &&
    (content[start - 1] === " " || content[start - 1] === "\t")
  ) {
    start--;
  }
  if (start > 0 && content[start - 1] === "\n") {
    start--;
  }

  const updated = content.substring(0, start) + content.substring(endIndex);

  // Clean up extra blank lines
  const cleaned = updated.replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(filePath, cleaned, "utf8");
  console.log(`✅ Removed related section: ${filePath}`);
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
