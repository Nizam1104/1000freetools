#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 1. Get the folder path from command line arguments
const targetDir = process.argv[2];

if (!targetDir) {
    console.error('Usage: node delete_bak.js <folder_path>');
    process.exit(1);
}

// 2. Resolve the absolute path and check if it exists
const absolutePath = path.resolve(targetDir);

if (!fs.existsSync(absolutePath)) {
    console.error(`Error: The path "${absolutePath}" does not exist.`);
    process.exit(1);
}

if (!fs.statSync(absolutePath).isDirectory()) {
    console.error(`Error: The path "${absolutePath}" is not a directory.`);
    process.exit(1);
}

console.log(`Starting scan in: ${absolutePath}`);

let deletedCount = 0;
let errorCount = 0;

// 3. Recursive function to traverse folders
function deleteBakFiles(dirPath) {
    let entries;
    try {
        // Read directory contents with file type info
        entries = fs.readdirSync(dirPath, { withFileTypes: true });
    } catch (err) {
        console.error(`Cannot read directory ${dirPath}: ${err.message}`);
        errorCount++;
        return;
    }

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            // Recurse into subdirectory
            deleteBakFiles(fullPath);
        } else if (entry.isFile()) {
            // Check if file ends with .bak
            if (path.extname(entry.name).toLowerCase() === '.bak') {
                try {
                    fs.unlinkSync(fullPath);
                    console.log(`Deleted: ${fullPath}`);
                    deletedCount++;
                } catch (err) {
                    console.error(`Failed to delete ${fullPath}: ${err.message}`);
                    errorCount++;
                }
            }
        }
    }
}

// 4. Run the function
deleteBakFiles(absolutePath);

// 5. Summary
console.log('--------------------------------');
console.log(`Operation Complete.`);
console.log(`Files deleted: ${deletedCount}`);
console.log(`Errors encountered: ${errorCount}`);