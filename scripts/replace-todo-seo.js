#!/usr/bin/env node
/**
 * Script to replace TODO comments with SEO component usage
 * Run with: node scripts/replace-todo-seo.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all page.tsx files with TODO comments
const output = execSync('find app -name "page.tsx" -exec grep -l "TODO: add seo component" {} \\;', { 
  cwd: path.join(__dirname, '..'),
  encoding: 'utf8'
});

const files = output.trim().split('\n').filter(f => f.length > 0);

console.log(`Found ${files.length} files to update\n`);

function toPascalCase(str) {
  return str.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

let updated = 0;
let failed = 0;

files.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  const toolName = path.basename(path.dirname(file));
  const category = path.basename(path.dirname(path.dirname(file)));
  const seoName = toPascalCase(toolName) + 'Seo';
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if already has the component
  if (content.includes(`<${seoName} />`)) {
    console.log(`Skip (already done): ${file}`);
    return;
  }
  
  // Replace TODO comment with component
  const todoPattern = new RegExp(`\\{\\/\\* TODO: add seo component for ${toolName} \\*\\/\\}`, 'g');
  
  if (!todoPattern.test(content)) {
    console.log(`Skip (no TODO match): ${file}`);
    return;
  }
  
  const replacement = `<div className="mt-16">\n        <${seoName} />\n      </div>`;
  content = content.replace(todoPattern, replacement);
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated: ${file} -> ${seoName}`);
  updated++;
});

console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`);
