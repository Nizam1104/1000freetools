const fs = require("fs");
const path = require("path");

const toolMetadata = [
    {
        toolName: "csv-viewer",
        h1: "CSV Viewer",
        title: "CSV Viewer — Instant Table Rendering for Any CSV File",
        p: "Stop squinting at raw comma-separated text. Drop your CSV and watch it transform into a crisp, sortable table in milliseconds — no spreadsheet software, no signups, no nonsense."
    },
    {
        toolName: "csv-editor",
        h1: "CSV Editor",
        title: "CSV Editor — Edit CSV Files Directly in Your Browser",
        p: "A lightweight, no-install CSV editor that feels like a spreadsheet. Click any cell, make your changes, and download a clean file — your data stays on your machine the entire time."
    },
    {
        toolName: "csv-validator",
        h1: "CSV Validator",
        title: "CSV Validator — Catch Structural Errors Before They Break Your Pipeline",
        p: "Malformed CSVs silently corrupt imports and crash scripts. Run your file through our validator to expose mismatched columns, rogue delimiters, and encoding gremlins before they cause real damage."
    },
    {
        toolName: "csv-formatter",
        h1: "CSV Formatter",
        title: "CSV Formatter — Standardize Messy CSVs to a Clean, Consistent Format",
        p: "Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack."
    },
    {
        toolName: "csv-pretty-print",
        h1: "CSV Pretty Print",
        title: "CSV Pretty Print — Turn Raw CSV Into Readable Aligned Text Tables",
        p: "Raw CSV is for machines. Pretty-printed CSV is for humans. Instantly convert your file into a neatly padded, column-aligned text table perfect for documentation, Slack messages, or terminal output."
    },
    {
        toolName: "csv-minifier",
        h1: "CSV Minifier",
        title: "CSV Minifier — Shrink CSV File Size Without Losing a Single Data Point",
        p: "Bloated CSVs slow down uploads, APIs, and imports. Our minifier strips every unnecessary byte — trailing spaces, redundant quotes, blank lines — giving you the leanest possible file with all your data intact."
    },
    {
        toolName: "csv-to-json",
        h1: "CSV to JSON Converter",
        title: "CSV to JSON Converter — Transform Spreadsheet Data Into API-Ready JSON",
        p: "Bridge the gap between flat files and modern APIs. Convert any CSV into clean JSON objects in one click — with smart type inference, optional nesting, and output that's ready to plug straight into your codebase."
    },
    {
        toolName: "csv-to-excel",
        h1: "CSV to Excel Converter",
        title: "CSV to Excel Converter — Export CSV Files to Formatted .XLSX Spreadsheets",
        p: "Not everyone speaks CSV. Convert your data to a properly formatted Excel workbook — with styled headers, auto-sized columns, and .xlsx compatibility that opens perfectly in every version of Excel."
    },
    {
        toolName: "csv-to-tsv",
        h1: "CSV to TSV Converter",
        title: "CSV to TSV Converter — Switch Delimiters From Commas to Tabs Safely",
        p: "Some tools demand tabs, not commas. Our converter safely swaps delimiters while correctly handling fields that contain commas — no manual find-and-replace nightmares, no corrupted columns."
    },
    {
        toolName: "csv-to-xml",
        h1: "CSV to XML Converter",
        title: "CSV to XML Converter — Transform Tabular CSV Data Into Structured XML",
        p: "Convert flat CSV data into well-formed XML with full control over element names, attribute vs child node structure, and indentation. Generate XML that's ready for legacy systems, APIs, or data interchange pipelines."
    },
    {
        toolName: "csv-to-yaml",
        h1: "CSV to YAML Converter",
        title: "CSV to YAML Converter — Turn CSV Data Into Human-Readable YAML Configuration",
        p: "From data tables to config files in one step. Convert CSV into clean YAML mappings with automatic type detection — ideal for seeding configuration files, test fixtures, or deployment manifests."
    },
    {
        toolName: "csv-to-sql",
        h1: "CSV to SQL Converter",
        title: "CSV to SQL Converter — Generate INSERT Statements From CSV Data Instantly",
        p: "Skip the manual SQL writing. Upload your CSV and get a ready-to-run SQL script — complete with a CREATE TABLE statement and properly typed INSERT rows — in the dialect your database actually speaks."
    },
    {
        toolName: "csv-to-html",
        h1: "CSV to HTML Table",
        title: "CSV to HTML Table — Convert CSV Data Into Embeddable HTML Tables",
        p: "Publish your data on the web without touching a spreadsheet plugin. Convert any CSV into a clean HTML table — styled, responsive, and ready to paste directly into your website or CMS."
    },
    {
        toolName: "csv-to-markdown",
        h1: "CSV to Markdown Table",
        title: "CSV to Markdown Table — Paste CSV, Get a GitHub-Ready Markdown Table",
        p: "Stop manually formatting Markdown tables character by character. Paste your CSV and get perfectly aligned Markdown table syntax — ready to drop into a README, wiki, or pull request description."
    },
    {
        toolName: "csv-to-array",
        h1: "CSV to Array Converter",
        title: "CSV to Array Converter — Convert CSV Into Code-Ready Arrays in Any Language",
        p: "Stop copy-pasting data into code by hand. Convert any CSV column or full table into a native array literal for JavaScript, Python, PHP, or Ruby — correctly formatted and ready to paste into your project."
    },
    {
        toolName: "csv-to-text",
        h1: "CSV to Text Converter",
        title: "CSV to Text Converter — Generate Plain Text Content From CSV Rows Using Templates",
        p: "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale."
    },
    {
        toolName: "csv-column-extractor",
        h1: "CSV Column Extractor",
        title: "CSV Column Extractor — Pull Specific Columns From Large CSV Files Instantly",
        p: "When you only need three columns from a fifty-column export, don't wrestle with Excel. Select exactly the columns you want, rename them if needed, and download a clean, trimmed CSV in seconds."
    },
    {
        toolName: "csv-column-remover",
        h1: "CSV Column Remover",
        title: "CSV Column Remover — Strip Unwanted Columns From CSV Files in One Click",
        p: "Sharing data externally but need to drop sensitive or irrelevant columns first? Select the columns to remove, preview the result, and download a clean file — without opening Excel or writing a script."
    },
    {
        toolName: "csv-column-reorder",
        h1: "CSV Column Reorder Tool",
        title: "CSV Column Reorder Tool — Drag and Drop CSV Columns Into Any Order",
        p: "Rearrange CSV columns visually instead of scripting it. Drag headers into the order you need, rename them on the fly, and download a restructured file that matches your target schema exactly."
    },
    {
        toolName: "csv-column-splitter",
        h1: "CSV Column Splitter",
        title: "CSV Column Splitter — Split One CSV Column Into Multiple Columns by Any Pattern",
        p: "Full names jammed into one column? Addresses that should be five fields? Split any column into as many parts as you need using delimiters, regex, or fixed positions — no formulas, no fuss."
    },
    {
        toolName: "csv-column-merger",
        h1: "CSV Column Merger",
        title: "CSV Column Merger — Combine Multiple CSV Columns Into a Single Field",
        p: "Concatenate first name + last name, city + state + zip, or any set of columns into one using any separator you choose. Merge columns with a custom template and optionally remove the originals — instantly."
    },
    {
        toolName: "csv-row-filter",
        h1: "CSV Row Filter",
        title: "CSV Row Filter — Filter CSV Rows by Column Values Without Writing Code",
        p: "Extract exactly the rows you care about using intuitive conditions — filter by value, range, pattern, or date across any column. Combine rules with AND/OR logic and download the matching subset in seconds."
    },
    {
        toolName: "csv-row-sorter",
        h1: "CSV Row Sorter",
        title: "CSV Row Sorter — Sort CSV Data by Any Column, Number, Date, or Alphabet",
        p: "Sort your CSV by any column — or chain multiple sort rules together. Numeric, alphabetic, and date-aware sorting all handled correctly, so your rows come out in exactly the order you need."
    },
    {
        toolName: "csv-row-counter",
        h1: "CSV Row Counter",
        title: "CSV Row Counter — Count Rows, Blanks, and Completeness Stats for Any CSV",
        p: "How many rows are actually in that file? How many are blank? What's the fill rate per column? Get a fast, complete row count and data completeness report without opening the file in Excel."
    },
    {
        toolName: "csv-header-editor",
        h1: "CSV Header Editor",
        title: "CSV Header Editor — Rename, Recase, and Clean CSV Column Headers in Bulk",
        p: "Headers like 'First Name ', 'LAST_NAME', and 'e mail' breaking your imports? Rename, normalize case, trim spaces, and convert to snake_case or camelCase across all headers at once."
    },
    {
        toolName: "csv-duplicate-remover",
        h1: "CSV Duplicate Remover",
        title: "CSV Duplicate Remover — Find and Delete Duplicate Rows From CSV Files",
        p: "Duplicate rows contaminate analysis, bloat databases, and silently inflate metrics. Remove them in one step — deduplicate on all columns or just a key field, keeping the first or last occurrence as you choose."
    },
    {
        toolName: "csv-deduplicator",
        h1: "CSV Deduplicator",
        title: "CSV Deduplicator — Remove Exact and Fuzzy Duplicate Records From CSV Data",
        p: "Exact duplicates are easy. But what about 'Jon Smith' vs 'John Smith'? Our deduplicator catches near-duplicates using fuzzy matching and phonetic algorithms — so your data is clean even when humans weren't consistent."
    },
    {
        toolName: "csv-join-merge",
        h1: "CSV Join / Merge Tool",
        title: "CSV Join / Merge Tool — SQL-Style Joins for CSV Files Without a Database",
        p: "Join two CSV files on a shared key column — just like a SQL JOIN, but without a database. Inner, left, right, or full outer join — pick your type, map your key columns, and get a merged file instantly."
    },
    {
        toolName: "csv-splitter",
        h1: "CSV Splitter",
        title: "CSV Splitter — Break Large CSV Files Into Smaller Chunks by Rows or Groups",
        p: "A 500,000-row CSV doesn't fit in most tools. Split it into equally sized chunks, or divide it by the values in a key column — each output file gets its own header and can be downloaded as a ZIP."
    },
    {
        toolName: "csv-file-merger",
        h1: "CSV File Merger",
        title: "CSV File Merger — Combine Multiple CSV Files Into One Unified Dataset",
        p: "Monthly exports, regional data splits, batch outputs — merge them all into one clean CSV. Handles mismatched column sets intelligently and optionally tags each row with its source file."
    },
    {
        toolName: "csv-delimiter-converter",
        h1: "CSV Delimiter Converter",
        title: "CSV Delimiter Converter — Change CSV Delimiter to Comma, Semicolon, Pipe, or Tab",
        p: "European exports use semicolons. Your tool expects pipes. Our converter switches delimiters in seconds — and automatically adds proper quoting around any fields that contain the new separator character."
    },
    {
        toolName: "csv-quote-escaper",
        h1: "CSV Quote Escaper",
        title: "CSV Quote Escaper — Properly Quote and Escape All Fields in a CSV File",
        p: "Unquoted fields with embedded commas or newlines corrupt CSV parsers. Our tool applies proper RFC 4180 quoting across every field that needs it — so your file parses correctly everywhere it's used."
    },
    {
        toolName: "csv-unquote",
        h1: "CSV Unquote Tool",
        title: "CSV Unquote Tool — Remove Unnecessary Quotes From Over-Quoted CSV Files",
        p: "Some exporters wrap every single field in quotes — even plain integers and booleans that don't need it. Strip the clutter, reduce file size, and get a clean CSV where quotes only appear when they matter."
    },
    {
        toolName: "csv-cleaner",
        h1: "CSV Cleaner",
        title: "CSV Cleaner — Automatically Fix Common CSV Issues in One Pass",
        p: "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed."
    },
    {
        toolName: "csv-data-normalizer",
        h1: "CSV Data Normalizer",
        title: "CSV Data Normalizer — Standardize Dates, Phone Numbers, and Values Across CSV Columns",
        p: "Mixed date formats, inconsistent phone number styles, 'Yes/yes/YES/1/true' in the same column — our normalizer applies consistent formatting rules across your data so every value speaks the same language."
    },
    {
        toolName: "csv-transpose",
        h1: "CSV Transpose Tool",
        title: "CSV Transpose Tool — Swap Rows and Columns in Any CSV File Instantly",
        p: "When your data is oriented the wrong way, transposing manually in Excel is a nightmare for large files. Flip rows to columns and columns to rows in one click — headers handled correctly, every time."
    },
    {
        toolName: "csv-random-row-generator",
        h1: "CSV Random Row Generator",
        title: "CSV Random Row Generator — Generate Realistic Fake CSV Data for Testing",
        p: "Stop hand-crafting test data. Define your columns and data types, choose how many rows you need, and generate a realistic fake CSV dataset in seconds — perfect for development, QA, and load testing."
    },
    {
        toolName: "csv-sample-generator",
        h1: "CSV Sample Generator",
        title: "CSV Sample Generator — Extract a Random Sample From Any Large CSV File",
        p: "Working with millions of rows but only need a representative slice? Extract a random sample of any size — by row count or percentage — with optional stratification to ensure balanced representation across key columns."
    },
    {
        toolName: "csv-column-statistics",
        h1: "CSV Column Statistics",
        title: "CSV Column Statistics — Get Instant Descriptive Stats for Every Column in Your CSV",
        p: "Understand your data before you process it. Get count, nulls, min, max, mean, median, and top values for every column in your CSV — all in one summary report, with no code required."
    },
    {
        toolName: "csv-email-extractor",
        h1: "CSV Email Extractor",
        title: "CSV Email Extractor — Pull All Valid Email Addresses Out of Any CSV File",
        p: "Email addresses scattered across multiple columns, mixed in with other data? Our extractor scans every cell, validates each address, deduplicates the results, and hands you a clean list — ready for your email tool."
    }
];

const linkMapping = {
    page_paths_to_slugs: {
        "app/csv-tools/csv-cleaner/page.tsx": "csv-cleaner",
        "app/csv-tools/csv-column-extractor/page.tsx": "csv-column-extractor",
        "app/csv-tools/csv-column-merger/page.tsx": "csv-column-merger",
        "app/csv-tools/csv-column-remover/page.tsx": "csv-column-remover",
        "app/csv-tools/csv-column-reorder/page.tsx": "csv-column-reorder",
        "app/csv-tools/csv-column-splitter/page.tsx": "csv-column-splitter",
        "app/csv-tools/csv-column-statistics/page.tsx": "csv-column-statistics",
        "app/csv-tools/csv-data-normalizer/page.tsx": "csv-data-normalizer",
        "app/csv-tools/csv-deduplicator/page.tsx": "csv-deduplicator",
        "app/csv-tools/csv-delimiter-converter/page.tsx": "csv-delimiter-converter",
        "app/csv-tools/csv-duplicate-remover/page.tsx": "csv-duplicate-remover",
        "app/csv-tools/csv-editor/page.tsx": "csv-editor",
        "app/csv-tools/csv-email-extractor/page.tsx": "csv-email-extractor",
        "app/csv-tools/csv-file-merger/page.tsx": "csv-file-merger",
        "app/csv-tools/csv-formatter/page.tsx": "csv-formatter",
        "app/csv-tools/csv-header-editor/page.tsx": "csv-header-editor",
        "app/csv-tools/csv-join-merge/page.tsx": "csv-join-merge",
        "app/csv-tools/csv-minifier/page.tsx": "csv-minifier",
        "app/csv-tools/csv-pretty-print/page.tsx": "csv-pretty-print",
        "app/csv-tools/csv-quote-escaper/page.tsx": "csv-quote-escaper",
        "app/csv-tools/csv-random-row-generator/page.tsx": "csv-random-row-generator",
        "app/csv-tools/csv-row-counter/page.tsx": "csv-row-counter",
        "app/csv-tools/csv-row-filter/page.tsx": "csv-row-filter",
        "app/csv-tools/csv-row-sorter/page.tsx": "csv-row-sorter",
        "app/csv-tools/csv-sample-generator/page.tsx": "csv-sample-generator",
        "app/csv-tools/csv-splitter/page.tsx": "csv-splitter",
        "app/csv-tools/csv-to-array/page.tsx": "csv-to-array",
        "app/csv-tools/csv-to-excel/page.tsx": "csv-to-excel",
        "app/csv-tools/csv-to-html/page.tsx": "csv-to-html",
        "app/csv-tools/csv-to-json/page.tsx": "csv-to-json",
        "app/csv-tools/csv-to-markdown/page.tsx": "csv-to-markdown",
        "app/csv-tools/csv-to-sql/page.tsx": "csv-to-sql",
        "app/csv-tools/csv-to-text/page.tsx": "csv-to-text",
        "app/csv-tools/csv-to-tsv/page.tsx": "csv-to-tsv",
        "app/csv-tools/csv-to-xml/page.tsx": "csv-to-xml",
        "app/csv-tools/csv-to-yaml/page.tsx": "csv-to-yaml",
        "app/csv-tools/csv-transpose/page.tsx": "csv-transpose",
        "app/csv-tools/csv-unquote/page.tsx": "csv-unquote",
        "app/csv-tools/csv-validator/page.tsx": "csv-validator",
        "app/csv-tools/csv-viewer/page.tsx": "csv-viewer",
    },
    related_page_slugs: {
        "csv-cleaner": ["csv-data-normalizer", "csv-formatter", "csv-validator", "csv-deduplicator", "csv-duplicate-remover"],
        "csv-column-extractor": ["csv-column-remover", "csv-column-splitter", "csv-column-statistics", "csv-column-reorder", "csv-column-merger"],
        "csv-column-merger": ["csv-column-splitter", "csv-editor", "csv-column-reorder", "csv-column-remover", "csv-join-merge"],
        "csv-column-remover": ["csv-column-extractor", "csv-column-reorder", "csv-column-splitter", "csv-column-statistics", "csv-column-merger"],
        "csv-column-reorder": ["csv-editor", "csv-column-merger", "csv-column-remover", "csv-column-splitter", "csv-header-editor"],
        "csv-column-splitter": ["csv-editor", "csv-column-merger", "csv-column-remover", "csv-column-reorder", "csv-delimiter-converter"],
        "csv-column-statistics": ["csv-row-counter", "csv-validator", "csv-cleaner", "csv-data-normalizer", "csv-column-extractor"],
        "csv-data-normalizer": ["csv-cleaner", "csv-formatter", "csv-validator", "csv-deduplicator", "csv-minifier"],
        "csv-deduplicator": ["csv-duplicate-remover", "csv-cleaner", "csv-row-filter", "csv-formatter", "csv-validator"],
        "csv-delimiter-converter": ["csv-to-tsv", "csv-column-splitter", "csv-formatter", "csv-cleaner"],
        "csv-duplicate-remover": ["csv-deduplicator", "csv-cleaner", "csv-row-filter", "csv-formatter", "csv-validator"],
        "csv-editor": ["csv-header-editor", "csv-viewer", "csv-cleaner", "csv-formatter", "csv-row-filter"],
        "csv-email-extractor": ["csv-column-extractor", "csv-row-filter", "csv-to-text", "csv-cleaner", "csv-column-statistics"],
        "csv-file-merger": ["csv-join-merge", "csv-splitter", "csv-column-merger", "csv-column-extractor", "csv-cleaner"],
        "csv-formatter": ["csv-cleaner", "csv-data-normalizer", "csv-minifier", "csv-pretty-print", "csv-validator"],
        "csv-header-editor": ["csv-editor", "csv-column-reorder", "csv-column-extractor", "csv-column-remover", "csv-cleaner"],
        "csv-join-merge": ["csv-file-merger", "csv-column-merger", "csv-column-extractor", "csv-splitter", "csv-cleaner"],
        "csv-minifier": ["csv-formatter", "csv-pretty-print", "csv-cleaner", "csv-to-text", "csv-data-normalizer"],
        "csv-pretty-print": ["csv-formatter", "csv-minifier", "csv-cleaner", "csv-viewer", "csv-to-text"],
        "csv-quote-escaper": ["csv-unquote", "csv-formatter", "csv-cleaner", "csv-delimiter-converter", "csv-validator"],
        "csv-random-row-generator": ["csv-sample-generator", "csv-row-counter", "csv-row-filter", "csv-cleaner", "csv-row-sorter"],
        "csv-row-counter": ["csv-column-statistics", "csv-row-filter", "csv-row-sorter", "csv-random-row-generator", "csv-sample-generator"],
        "csv-row-filter": ["csv-row-sorter", "csv-deduplicator", "csv-duplicate-remover", "csv-cleaner", "csv-row-counter"],
        "csv-row-sorter": ["csv-row-filter", "csv-row-counter", "csv-cleaner", "csv-deduplicator", "csv-duplicate-remover"],
        "csv-sample-generator": ["csv-random-row-generator", "csv-row-counter", "csv-row-filter", "csv-cleaner", "csv-row-sorter"],
        "csv-splitter": ["csv-file-merger", "csv-column-splitter", "csv-join-merge", "csv-cleaner", "csv-row-filter"],
        "csv-to-array": ["csv-to-json", "csv-to-yaml", "csv-to-text", "csv-to-html", "csv-to-xml"],
        "csv-to-excel": ["csv-to-html", "csv-to-json", "csv-to-sql", "csv-to-xml"],
        "csv-to-html": ["csv-to-excel", "csv-to-json", "csv-to-markdown", "csv-to-xml"],
        "csv-to-json": ["csv-to-array", "csv-to-yaml", "csv-to-html", "csv-to-xml"],
        "csv-to-markdown": ["csv-to-text", "csv-to-html", "csv-to-json", "csv-to-sql", "csv-to-tsv"],
        "csv-to-sql": ["csv-to-json", "csv-to-xml", "csv-to-markdown", "csv-to-text"],
        "csv-to-text": ["csv-to-markdown", "csv-to-tsv", "csv-to-array", "csv-minifier"],
        "csv-to-tsv": ["csv-delimiter-converter", "csv-to-text", "csv-to-html", "csv-to-markdown"],
        "csv-to-xml": ["csv-to-html", "csv-to-json", "csv-to-sql", "csv-to-yaml"],
        "csv-to-yaml": ["csv-to-json", "csv-to-array", "csv-to-xml", "csv-to-sql", "csv-to-text"],
        "csv-transpose": ["csv-column-reorder", "csv-editor", "csv-column-merger", "csv-column-remover", "csv-column-splitter"],
        "csv-unquote": ["csv-quote-escaper", "csv-formatter", "csv-cleaner", "csv-delimiter-converter", "csv-validator"],
        "csv-validator": ["csv-cleaner", "csv-data-normalizer", "csv-formatter", "csv-deduplicator", "csv-duplicate-remover"],
        "csv-viewer": ["csv-editor", "csv-pretty-print", "csv-cleaner", "csv-formatter", "csv-row-filter"],
    }
};


// Build mapping from slug to metadata index for easy lookup
const slugToMeta = {};
toolMetadata.forEach((meta, index) => {
    slugToMeta[meta.toolName] = index;
});

// Define slugs to be removed
const slugsToRemove = [
    "excel-to-csv",
    "html-to-csv",
    "json-to-csv",
    "sql-to-csv",
    "text-to-csv",
    "tsv-to-csv",
    "xml-to-csv"
];

// Filter linkMapping.related_page_slugs to remove entries where key is a slugToRemove
// And filter out slugsToRemove from the arrays
const filteredRelatedPageSlugs = {};
for (const [key, value] of Object.entries(linkMapping.related_page_slugs)) {
    if (!slugsToRemove.includes(key)) {
        filteredRelatedPageSlugs[key] = value.filter(slug => !slugsToRemove.includes(slug));
    }
}

// Update linkMapping.related_page_slugs after filtering
linkMapping.related_page_slugs = filteredRelatedPageSlugs;


// Create a reverse mapping from slug to metadata for easy lookup
const slugToMetadata = {};
toolMetadata.forEach((meta) => {
    slugToMetadata[meta.toolName] = meta;
});

const generateLayout = (toolName, { h1, p, title }) => {
    const canonical = `https://1000freetools.com/csv-tools/${toolName}`;

    // Get the related tool slugs for the current tool
    const relatedSlugs = linkMapping.related_page_slugs[toolName] || [];

    // Generate tools array for ToolLinkCards based on the mapping
    const otherTools = relatedSlugs.map((slug) => {
        const meta = slugToMetadata[slug];
        if (!meta) {
            console.warn(`Warning: No metadata found for slug "${slug}" for tool "${toolName}"`);
            return null;
        }
        return {
            name: meta.h1,
            description: meta.p,
            href: `/csv-tools/${slug}`,
        };
    }).filter(Boolean);

    const toolsJson = JSON.stringify(otherTools, null, 2);

    return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "${title}",
  description: "${p}",
  alternates: {
    canonical: "${canonical}",
  },
};

const tools = ${toolsJson};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">${h1}</h1>
        <p className="text-muted-foreground">
          ${p}
        </p>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
`;
};

// Loop through all toolMetadata entries and create layout.tsx files
for (const meta of toolMetadata) {
    const { toolName, h1, p, title } = meta;
    const dir = path.join("app", "csv-tools", toolName);
    const filePath = path.join(dir, "layout.tsx");

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, generateLayout(toolName, { h1, p, title }), "utf-8");

    console.log(`✅ Created: ${filePath}`);
}

console.log("\n✅ Done! All layout.tsx files generated for CSV tools.");
