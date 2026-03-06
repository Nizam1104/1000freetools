#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

if (!folderPath) {
    console.error("Usage: node fix-duplicate-headers.js <folder-path>");
    process.exit(1);
}

const resolvedFolder = path.resolve(folderPath);

if (!fs.existsSync(resolvedFolder)) {
    console.error(`Folder not found: ${resolvedFolder}`);
    process.exit(1);
}

console.log(`\nScanning: ${resolvedFolder}\n`);

const toolFolders = fs
    .readdirSync(resolvedFolder)
    .filter((name) =>
        fs.statSync(path.join(resolvedFolder, name)).isDirectory()
    );

let processed = 0;
let skipped = 0;
let errors = 0;

for (const toolName of toolFolders) {
    const toolDir = path.join(resolvedFolder, toolName);
    const layoutPath = path.join(toolDir, "layout.tsx");
    const pagePath = path.join(toolDir, "page.tsx");

    if (!fs.existsSync(layoutPath)) {
        console.log(`[SKIP] ${toolName} — no layout.tsx`);
        skipped++;
        continue;
    }

    if (!fs.existsSync(pagePath)) {
        console.log(`[SKIP] ${toolName} — no page.tsx`);
        skipped++;
        continue;
    }

    const layoutContent = fs.readFileSync(layoutPath, "utf-8");

    // Check if layout.tsx has an <h1> tag
    const h1Match = layoutContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!h1Match) {
        console.log(`[SKIP] ${toolName} — no <h1> in layout.tsx`);
        skipped++;
        continue;
    }

    // Check if there's a <p> tag after the <h1>
    const h1Index = layoutContent.indexOf(h1Match[0]);
    const afterH1 = layoutContent.slice(h1Index + h1Match[0].length);
    const pAfterH1 = afterH1.match(/^[\s\S]*?<p[^>]*>[\s\S]*?<\/p>/);

    if (!pAfterH1) {
        console.log(`[SKIP] ${toolName} — no <p> after <h1> in layout.tsx`);
        skipped++;
        continue;
    }

    console.log(`[FOUND] ${toolName} — layout.tsx has <h1> + <p>`);

    // Extract h1 and p text to identify them in page.tsx
    const h1Text = h1Match[1].replace(/<[^>]+>/g, "").trim();
    const pMatch = pAfterH1[0].match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const pText = pMatch ? pMatch[1].replace(/<[^>]+>/g, "").trim() : null;

    console.log(`         h1: "${h1Text.slice(0, 60)}"`);
    if (pText) console.log(`         p:  "${pText.slice(0, 60)}"`);

    const pageContent = fs.readFileSync(pagePath, "utf-8");

    // Find CardHeader block that contains these texts
    // Match <CardHeader ...>...</CardHeader> (handles multiline, nested tags)
    const cardHeaderRegex = /<CardHeader[\s\S]*?<\/CardHeader>/g;
    let match;
    let newPageContent = pageContent;
    let found = false;

    while ((match = cardHeaderRegex.exec(pageContent)) !== null) {
        const block = match[0];
        const blockText = block.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

        const hasH1 = blockText.includes(h1Text.slice(0, 20));
        const hasPara = pText ? blockText.includes(pText.slice(0, 20)) : true;

        if (hasH1 && hasPara) {
            console.log(`         ✓ Found matching CardHeader in page.tsx — removing`);

            // Remove the CardHeader block and any surrounding blank lines
            newPageContent = newPageContent
                .replace(block, "")
                .replace(/\n{3,}/g, "\n\n"); // collapse extra blank lines

            found = true;
            break;
        }
    }

    if (!found) {
        console.log(
            `         ⚠ No matching CardHeader found in page.tsx (may already be removed)`
        );
        skipped++;
        continue;
    }

    // Write back the updated page.tsx
    try {
        fs.writeFileSync(pagePath, newPageContent, "utf-8");
        console.log(`         ✅ page.tsx updated\n`);
        processed++;
    } catch (err) {
        console.error(`         ❌ Failed to write page.tsx: ${err.message}\n`);
        errors++;
    }
}

console.log("─".repeat(50));
console.log(`Done. Processed: ${processed} | Skipped: ${skipped} | Errors: ${errors}`);