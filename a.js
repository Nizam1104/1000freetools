const fs = require('fs');
const path = require('path');

// Folder containing your JSON files
const JSON_FOLDER = './json-assets/'; // <-- change this to your folder path

function formatCategoryName(filename) {
  // Remove extension
  const base = path.basename(filename, '.json');
  // Remove trailing "-links" or similar suffixes
  const cleaned = base.replace(/-links$/i, '');
  // Convert kebab-case to Title Case
  return cleaned
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getCategoryHref(filename) {
  const base = path.basename(filename, '.json');
  const cleaned = base.replace(/-links$/i, '');
  return '/' + cleaned;
}

function processJsonFiles() {
  const files = fs.readdirSync(JSON_FOLDER).filter(f => f.endsWith('.json'));
  console.log(files)

  const result = files.map(filename => {
    const filePath = path.join(JSON_FOLDER, filename);
    console.log(filePath)
    const raw = fs.readFileSync(filePath, 'utf-8');
    let tools = JSON.parse(raw)
    // console.log(tools)

    const categoryName = formatCategoryName(filename);
    const categoryHref = getCategoryHref(filename);

    // First entry: the "All X Tools" link pointing to the category root
    const allToolsEntry = {
      name: categoryName,
      href: categoryHref,
    };

    // Skip files that don't have an array structure (e.g., math-tools-links.json)
    if (!Array.isArray(tools)) {
      return {
        categoryName,
        tools: [allToolsEntry],
      };
    } else {
      console.log('a')
    }

    // Take first 10 tools from the JSON array (only name + href)
    const topTools = tools.slice(0, 10).map(tool => ({
      name: tool.name,
      href: tool.href,
    }));

    return {
      categoryName,
      tools: [allToolsEntry, ...topTools],
    };
  });

  return result;
}

const output = processJsonFiles();
fs.writeFileSync('fl.json', JSON.stringify(output))
console.log(JSON.stringify(output, null, 2));