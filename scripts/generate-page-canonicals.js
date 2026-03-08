#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const CANONICAL_FIXES_PATH = path.join(__dirname, "../canonical-fixes.json");
const OUTPUT_PATH = path.join(__dirname, "../page-canonical-mappings.json");
const APP_DIR = path.join(__dirname, "../app");

// Read the canonical fixes
const canonicalFixes = JSON.parse(fs.readFileSync(CANONICAL_FIXES_PATH, "utf8"));

// Function to convert URL path to file system path
function urlToFilePath(url) {
  // Remove domain
  const pathPart = url.replace("https://1000freetools.com", "");
  
  // Split into segments
  const segments = pathPart.split("/").filter(s => s.length > 0);
  
  // Build file path
  return path.join(APP_DIR, ...segments, "page.tsx");
}

// Generate mappings
const pageCanonicalMappings = {};

for (const [canonicalUrl, duplicateUrls] of Object.entries(canonicalFixes)) {
  for (const duplicateUrl of duplicateUrls) {
    const filePath = urlToFilePath(duplicateUrl);
    
    pageCanonicalMappings[filePath] = {
      duplicateUrl: duplicateUrl,
      canonicalUrl: canonicalUrl
    };
  }
}

// Write the mappings
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(pageCanonicalMappings, null, 2), "utf8");

console.log("✅ Generated page canonical mappings!");
console.log(`📊 Total pages to update: ${Object.keys(pageCanonicalMappings).length}`);
console.log(`💾 Mappings saved to: ${OUTPUT_PATH}`);

// Print summary
console.log("\n📋 Pages to update:");
for (const [filePath, mapping] of Object.entries(pageCanonicalMappings)) {
  console.log(`  ${mapping.duplicateUrl} -> ${mapping.canonicalUrl}`);
}
