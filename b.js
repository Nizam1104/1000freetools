// const fs = require('fs');

// const filePath = './ts-errors.txt';

// try {
//     // 1. Read the file content
//     const data = fs.readFileSync(filePath, 'utf8');

//     // 2. Process the lines
//     const fileNames = data.split('\n')
//         .map(line => line.trim())
//         .filter(line => line.length > 0) // Remove empty lines
//         .map(line => {
//             // Extract everything before the first '('
//             return line.split('(')[0];
//         });

//     // 3. Remove duplicates using a Set
//     const uniqueFiles = [...new Set(fileNames)];

//     // 4. Output the result
//     console.log("Unique files with errors:");
//     uniqueFiles.forEach(file => console.log(file));

// } catch (err) {
//     console.error("Error reading the file:", err.message);
// }















