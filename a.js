// #!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');

// const folderPath = process.argv[2];

// if (!folderPath) {
//     console.error('Usage: node remove-related-tools.js <folder-path>');
//     process.exit(1);
// }

// if (!fs.existsSync(folderPath)) {
//     console.error(`Folder not found: ${folderPath}`);
//     process.exit(1);
// }

// // Recursively find all page.tsx files
// function findPageFiles(dir) {
//     let results = [];
//     const entries = fs.readdirSync(dir, { withFileTypes: true });
//     for (const entry of entries) {
//         const fullPath = path.join(dir, entry.name);
//         if (entry.isDirectory()) {
//             results = results.concat(findPageFiles(fullPath));
//         } else if (entry.isFile() && entry.name === 'page.tsx') {
//             results.push(fullPath);
//         }
//     }
//     return results;
// }

// /**
//  * Removes the <Card>...</Card> block that contains a <CardTitle>Related Tools</CardTitle>.
//  * Uses a character-by-character tag-balancing approach so it handles any
//  * amount of nesting and whitespace without disturbing the rest of the file.
//  */
// function removeRelatedToolsCard(content) {
//     // We'll search for the pattern: <Card> (with optional whitespace/newlines)
//     // followed eventually by <CardTitle>Related Tools</CardTitle>
//     // Then we remove the entire balanced <Card>...</Card> block.

//     let result = content;
//     let changed = false;

//     // Keep removing until no more matches (handles multiple occurrences)
//     while (true) {
//         const newResult = removeSingleRelatedToolsCard(result);
//         if (newResult === result) break;
//         result = newResult;
//         changed = true;
//     }

//     return { content: result, changed };
// }

// function removeSingleRelatedToolsCard(content) {
//     // Find a <Card that is followed (within the same block) by Related Tools CardTitle
//     // Strategy: find all <Card> opening positions, then for each check if
//     // its block contains "Related Tools", then remove the balanced block.

//     const cardOpenRegex = /<Card[\s>]/g;
//     let match;

//     while ((match = cardOpenRegex.exec(content)) !== null) {
//         const startIndex = match.index;

//         // Find the end of this balanced <Card>...</Card>
//         const blockEnd = findBalancedCardEnd(content, startIndex);
//         if (blockEnd === -1) continue;

//         const block = content.slice(startIndex, blockEnd);

//         // Check if this block contains Related Tools
//         if (!/<CardTitle[^>]*>\s*Related Tools\s*<\/CardTitle>/.test(block)) continue;

//         // Remove the block, also eating any leading whitespace/newlines on the same line
//         // and the trailing newline after the closing tag
//         let removeStart = startIndex;
//         let removeEnd = blockEnd;

//         // Eat leading whitespace (spaces/tabs) before the <Card on its line
//         while (removeStart > 0 && (content[removeStart - 1] === ' ' || content[removeStart - 1] === '\t')) {
//             removeStart--;
//         }
//         // Eat the preceding newline too so we don't leave a blank line
//         if (removeStart > 0 && content[removeStart - 1] === '\n') {
//             removeStart--;
//         }

//         // Eat trailing newline after the closing </Card>
//         if (removeEnd < content.length && content[removeEnd] === '\n') {
//             removeEnd++;
//         }

//         return content.slice(0, removeStart) + content.slice(removeEnd);
//     }

//     return content;
// }

// /**
//  * Given the content and the index of '<Card', find the index just after
//  * the matching closing '</Card>'.
//  * Handles self-closing tags and nested <Card> components.
//  */
// function findBalancedCardEnd(content, startIndex) {
//     // Move past the opening '<Card'
//     let i = startIndex + '<Card'.length;

//     // Check for self-closing: <Card ... />
//     // First, skip the attributes of the opening tag
//     let depth = 1;
//     // Find the end of the opening tag (either '/>' or '>')
//     while (i < content.length) {
//         if (content[i] === '/' && content[i + 1] === '>') {
//             // Self-closing — depth stays at 0 immediately
//             return i + 2;
//         }
//         if (content[i] === '>') {
//             i++; // move past '>'
//             break;
//         }
//         // Handle strings inside attributes
//         if (content[i] === '"' || content[i] === "'") {
//             const quote = content[i];
//             i++;
//             while (i < content.length && content[i] !== quote) i++;
//         }
//         i++;
//     }

//     // Now walk through the content balancing <Card...> and </Card>
//     while (i < content.length) {
//         // Look for next relevant tag
//         const nextOpen = content.indexOf('<Card', i);
//         const nextClose = content.indexOf('</Card>', i);

//         if (nextClose === -1) return -1; // malformed

//         if (nextOpen !== -1 && nextOpen < nextClose) {
//             // Make sure it's actually a <Card tag (not <CardTitle etc.) — 
//             // check the char after 'Card': must be whitespace, '>', or '/'
//             const charAfter = content[nextOpen + 5]; // '<Card' is 5 chars
//             if (charAfter === '>' || charAfter === ' ' || charAfter === '\n' || charAfter === '\r' || charAfter === '\t' || charAfter === '/') {
//                 // Check if self-closing
//                 const tagEnd = content.indexOf('>', nextOpen);
//                 if (content[tagEnd - 1] === '/') {
//                     // Self-closing nested <Card />, doesn't affect depth
//                     i = tagEnd + 1;
//                 } else {
//                     depth++;
//                     i = tagEnd + 1;
//                 }
//             } else {
//                 // It's <CardTitle, <CardHeader, etc. — skip it
//                 i = nextOpen + 5;
//             }
//         } else {
//             // nextClose comes first
//             depth--;
//             i = nextClose + '</Card>'.length;
//             if (depth === 0) {
//                 return i;
//             }
//         }
//     }

//     return -1;
// }

// // Main
// const pageFiles = findPageFiles(folderPath);
// console.log(`Found ${pageFiles.length} page.tsx file(s)\n`);

// let modifiedCount = 0;

// for (const filePath of pageFiles) {
//     const original = fs.readFileSync(filePath, 'utf8');
//     const { content, changed } = removeRelatedToolsCard(original);

//     if (changed) {
//         fs.writeFileSync(filePath, content, 'utf8');
//         console.log(`✅ Modified: ${filePath}`);
//         modifiedCount++;
//     } else {
//         console.log(`⏭  Skipped (no Related Tools card): ${filePath}`);
//     }
// }

// console.log(`\nDone. Modified ${modifiedCount} of ${pageFiles.length} file(s).`);

const fs = require('fs');
const path = require('path');

const folderPath = process.argv[2];

if (!folderPath) {
    console.error('Usage: node remove-related-tools.js <folder-path>');
    process.exit(1);
}

if (!fs.existsSync(folderPath)) {
    console.error(`Folder not found: ${folderPath}`);
    process.exit(1);
}

function findPageFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findPageFiles(fullPath));
        } else if (entry.isFile() && entry.name === 'page.tsx') {
            results.push(fullPath);
        }
    }
    return results;
}

function isRelatedHeading(text) {
    return /related/i.test(text);
}

/**
 * Find the end position (exclusive) of a JSX element starting at startPos.
 * startPos should be at the `<` of the opening tag.
 * Returns index after closing tag, or -1.
 */
function findBlockEnd(content, startPos, tagName) {
    let j = startPos + 1 + tagName.length; // skip past `<tagName`
    let inStr = null;
    let openTagEnd = -1;

    while (j < content.length) {
        const ch = content[j];
        if (inStr) {
            if (ch === inStr) inStr = null;
        } else if (ch === '"' || ch === "'") {
            inStr = ch;
        } else if (ch === '>') {
            if (content[j - 1] === '/') return j + 1; // self-closing
            openTagEnd = j;
            break;
        }
        j++;
    }

    if (openTagEnd === -1) return -1;

    let pos = openTagEnd + 1;
    let nestDepth = 1;

    while (nestDepth > 0 && pos < content.length) {
        const openRe = new RegExp(`<${tagName}(?=[\\s>/])`, 'g');
        const closeRe = new RegExp(`<\\/${tagName}\\s*>`, 'g');
        openRe.lastIndex = pos;
        closeRe.lastIndex = pos;

        const nextOpen = openRe.exec(content);
        const nextClose = closeRe.exec(content);

        if (!nextClose) return -1;

        if (nextOpen && nextOpen.index < nextClose.index) {
            // Check if self-closing
            let k = nextOpen.index + nextOpen[0].length;
            let isSelf = false;
            inStr = null;
            while (k < content.length) {
                const ch = content[k];
                if (inStr) {
                    if (ch === inStr) inStr = null;
                } else if (ch === '"' || ch === "'") {
                    inStr = ch;
                } else if (ch === '>') {
                    if (content[k - 1] === '/') isSelf = true;
                    break;
                }
                k++;
            }
            if (!isSelf) nestDepth++;
            pos = nextOpen.index + 1;
        } else {
            nestDepth--;
            if (nestDepth === 0) return nextClose.index + nextClose[0].length;
            pos = nextClose.index + nextClose[0].length;
        }
    }

    return -1;
}

function blockHasRelatedHeading(block) {
    // Check within first 500 chars for the heading
    const checkArea = block.slice(0, 500);
    const headingRe = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/g;
    let m;
    while ((m = headingRe.exec(checkArea)) !== null) {
        if (isRelatedHeading(m[0])) return true;
    }
    return false;
}

/**
 * Remove all blocks of a given tag that contain a Related heading.
 * For `div`, only match divs that have attributes (className, etc.)
 * so we don't accidentally match root wrapper divs.
 */
function removeRelatedBlocksOfTag(content, tagName) {
    let result = content;
    let removed = 0;
    let changed = true;

    // For div: only match <div followed by whitespace+attributes, not plain <div>
    const openPattern = tagName === 'div'
        ? `<div(?=\\s[^>]+>)`   // div must have attributes
        : `<${tagName}(?=[\\s>/])`;

    while (changed) {
        changed = false;
        const openRe = new RegExp(openPattern, 'g');
        let match;

        while ((match = openRe.exec(result)) !== null) {
            const start = match.index;
            const end = findBlockEnd(result, start, tagName);
            if (end === -1) continue;

            const block = result.slice(start, end);
            if (blockHasRelatedHeading(block) && /<a[\s>]/.test(block)) {
                let removeStart = start;
                while (removeStart > 0 && /[ \t]/.test(result[removeStart - 1])) removeStart--;
                if (removeStart > 0 && result[removeStart - 1] === '\n') removeStart--;
                result = result.slice(0, removeStart) + result.slice(end);
                removed++;
                changed = true;
                break;
            }
        }
    }

    return { content: result, removed };
}

function removeRelatedToolsBlocks(content) {
    let current = content;
    let totalRemoved = 0;

    for (const tag of ['Card', 'section', 'div']) {
        const { content: updated, removed } = removeRelatedBlocksOfTag(current, tag);
        current = updated;
        totalRemoved += removed;
    }

    return { content: current, removed: totalRemoved };
}

const pageFiles = findPageFiles(folderPath);
console.log(`Found ${pageFiles.length} page.tsx files\n`);

let totalFilesModified = 0;
let totalBlocksRemoved = 0;

for (const filePath of pageFiles) {
    const original = fs.readFileSync(filePath, 'utf8');
    const { content: modified, removed } = removeRelatedToolsBlocks(original);

    if (removed > 0) {
        fs.writeFileSync(filePath, modified, 'utf8');
        console.log(`✓ ${filePath} — removed ${removed} block(s)`);
        totalFilesModified++;
        totalBlocksRemoved += removed;
    }
}

console.log(`\nDone! Modified ${totalFilesModified} files, removed ${totalBlocksRemoved} "Related Tools" block(s).`);