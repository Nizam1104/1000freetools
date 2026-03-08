#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const CANONICAL_FIXES_PATH = path.join(__dirname, "../canonical-fixes.json");
const OUTPUT_PATH = path.join(__dirname, "../canonical-fixes-verified.json");

// Function to fetch a page and extract its canonical URL
async function fetchCanonical(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CanonicalFixBot/1.0)",
      },
    });

    if (!response.ok) {
      console.error(`  ❌ Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return null;
    }

    const html = await response.text();

    // Extract canonical URL from <link rel="canonical" href="...">
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    
    if (canonicalMatch && canonicalMatch[1]) {
      return canonicalMatch[1];
    }

    // Try alternate format: href before rel
    const canonicalMatchAlt = html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
    
    if (canonicalMatchAlt && canonicalMatchAlt[1]) {
      return canonicalMatchAlt[1];
    }

    console.warn(`  ⚠️  No canonical found for ${url}`);
    return null;
  } catch (error) {
    console.error(`  ❌ Error fetching ${url}: ${error.message}`);
    return null;
  }
}

// Function to sleep for a given milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  console.log("🔧 Reading canonical-fixes.json...\n");
  
  const canonicalFixes = JSON.parse(fs.readFileSync(CANONICAL_FIXES_PATH, "utf8"));
  const verifiedMapping = {};
  
  const entries = Object.entries(canonicalFixes);
  const totalEntries = entries.length;
  
  console.log(`📊 Found ${totalEntries} tool groups to process\n`);
  
  let processedCount = 0;
  let correctCount = 0;
  let needsFixCount = 0;
  
  for (const [canonicalUrl, duplicateUrls] of entries) {
    processedCount++;
    console.log(`\n[${processedCount}/${totalEntries}] Processing: ${canonicalUrl}`);
    
    const verifiedDuplicates = [];
    const needsFix = [];
    
    for (const duplicateUrl of duplicateUrls) {
      console.log(`  📄 Fetching: ${duplicateUrl}`);
      
      const fetchedCanonical = await fetchCanonical(duplicateUrl);
      
      if (fetchedCanonical) {
        // Normalize URLs for comparison (remove trailing slashes)
        const normalizedCanonical = canonicalUrl.replace(/\/$/, "");
        const normalizedFetched = fetchedCanonical.replace(/\/$/, "");
        
        if (normalizedFetched === normalizedCanonical) {
          console.log(`  ✅ Correct! Canonical already points to: ${fetchedCanonical}`);
          verifiedDuplicates.push(duplicateUrl);
          correctCount++;
        } else {
          console.log(`  ❌ NEEDS FIX! Current: ${fetchedCanonical}, Should be: ${canonicalUrl}`);
          needsFix.push({
            url: duplicateUrl,
            currentCanonical: fetchedCanonical,
            targetCanonical: canonicalUrl
          });
          needsFixCount++;
        }
      } else {
        console.log(`  ❌ Could not fetch canonical`);
        needsFix.push({
          url: duplicateUrl,
          currentCanonical: null,
          targetCanonical: canonicalUrl
        });
        needsFixCount++;
      }
      
      // Rate limiting - wait between requests to avoid being blocked
      await sleep(500);
    }
    
    verifiedMapping[canonicalUrl] = {
      correct: verifiedDuplicates,
      needsFix: needsFix
    };
    
    // Additional delay between tool groups
    await sleep(1000);
  }
  
  // Write the verified mapping
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(verifiedMapping, null, 4), "utf8");
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ Verification complete!");
  console.log(`📊 Total tool groups: ${totalEntries}`);
  console.log(`📊 Total duplicate URLs: ${correctCount + needsFixCount}`);
  console.log(`📊 Already correct: ${correctCount}`);
  console.log(`📊 Need canonical fix: ${needsFixCount}`);
  console.log(`\n💾 Output saved to: ${OUTPUT_PATH}`);
  console.log("=".repeat(60));
}

// Run the script
main().catch(error => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
