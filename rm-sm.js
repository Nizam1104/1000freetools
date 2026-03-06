#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const folderPath = process.argv[2];

if (!folderPath) {
    console.error("Usage: node fix-client-metadata.js <folder-path>");
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
    .filter((name) => fs.statSync(path.join(resolvedFolder, name)).isDirectory());

let processed = 0;
let skipped = 0;
let errors = 0;

for (const toolName of toolFolders) {
    const toolDir = path.join(resolvedFolder, toolName);
    const pagePath = path.join(toolDir, "page.tsx");

    if (!fs.existsSync(pagePath)) {
        console.log(`[SKIP] ${toolName} — no page.tsx`);
        skipped++;
        continue;
    }

    let content = fs.readFileSync(pagePath, "utf-8");

    // Must have "use client" to be a problem
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
        console.log(`[SKIP] ${toolName} — not a client component`);
        skipped++;
        continue;
    }

    // Must have a metadata export
    if (!content.includes("export const metadata")) {
        console.log(`[SKIP] ${toolName} — no metadata export found`);
        skipped++;
        continue;
    }

    console.log(`[FOUND] ${toolName} — "use client" + metadata export`);

    let newContent = content;

    // Remove: export const metadata = { ... };
    // Handles multiline objects with nested braces
    newContent = removeExportConst(newContent, "metadata");

    if (newContent === content) {
        console.log(`        ⚠ Could not parse metadata block — skipping\n`);
        skipped++;
        continue;
    }

    // Clean up extra blank lines left behind (max 2 consecutive)
    newContent = newContent.replace(/\n{3,}/g, "\n\n");

    try {
        fs.writeFileSync(pagePath, newContent, "utf-8");
        console.log(`        ✅ Removed metadata export from page.tsx\n`);
        processed++;
    } catch (err) {
        console.error(`        ❌ Failed to write: ${err.message}\n`);
        errors++;
    }
}

console.log("─".repeat(50));
console.log(`Done. Processed: ${processed} | Skipped: ${skipped} | Errors: ${errors}`);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Removes `export const <name> = { ... };` from content,
 * correctly handling nested braces/brackets/strings.
 */
function removeExportConst(content, name) {
    const startPattern = new RegExp(`export const ${name}\\s*=\\s*\\{`);
    const match = startPattern.exec(content);
    if (!match) return content;

    const openBraceIndex = content.indexOf("{", match.index + match[0].length - 1);
    if (openBraceIndex === -1) return content;

    // Walk forward tracking brace depth
    let depth = 0;
    let i = openBraceIndex;
    let inString = false;
    let stringChar = "";

    while (i < content.length) {
        const ch = content[i];

        if (inString) {
            if (ch === "\\") {
                i += 2; // skip escaped char
                continue;
            }
            if (ch === stringChar) inString = false;
        } else {
            if (ch === '"' || ch === "'" || ch === "`") {
                inString = true;
                stringChar = ch;
            } else if (ch === "{" || ch === "[") {
                depth++;
            } else if (ch === "}" || ch === "]") {
                depth--;
                if (depth === 0) {
                    // consume optional trailing semicolon
                    let end = i + 1;
                    if (content[end] === ";") end++;
                    // remove the whole block including leading newline
                    const before = content.slice(0, match.index);
                    const after = content.slice(end);
                    return before + after;
                }
            }
        }
        i++;
    }

    return content; // couldn't find end — return unchanged
}