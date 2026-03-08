import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { FileSpreadsheet, ArrowRight } from "lucide-react";

const csvTools = [
  {
    name: "CSV Viewer",
    description: "View and analyze CSV files online with sorting and filtering",
    href: "/csv-tools/csv-viewer",
  },
  {
    name: "CSV Editor",
    description: "Edit CSV files directly in your browser with spreadsheet-like interface",
    href: "/csv-tools/csv-editor",
  },
  {
    name: "CSV Validator",
    description: "Validate CSV structure, column counts, data types, and encoding issues",
    href: "/csv-tools/csv-validator",
  },
  {
    name: "CSV Formatter",
    description: "Standardize CSV formatting: quoting, delimiters, whitespace, line endings, UTF-8",
    href: "/csv-tools/csv-formatter",
  },
  {
    name: "CSV Pretty Print",
    description: "Convert CSV to human-readable aligned text tables",
    href: "/csv-tools/csv-pretty-print",
  },
  {
    name: "CSV Minifier",
    description: "Strip unnecessary whitespace, blank lines, and redundant quotes to reduce file size",
    href: "/csv-tools/csv-minifier",
  },
  {
    name: "CSV to JSON",
    description: "Convert CSV to JSON array of objects with type inference options",
    href: "/csv-tools/csv-to-json",
  },
  {
    name: "CSV to Excel",
    description: "Convert CSV to formatted .xlsx spreadsheets with styled headers",
    href: "/csv-tools/csv-to-excel",
  },
  {
    name: "CSV to TSV",
    description: "Convert comma-delimited CSV to tab-separated values (TSV)",
    href: "/csv-tools/csv-to-tsv",
  },
  {
    name: "CSV to XML",
    description: "Transform CSV rows into XML elements with configurable structure",
    href: "/csv-tools/csv-to-xml",
  },
  {
    name: "CSV to YAML",
    description: "Convert CSV to YAML list of mappings with type inference",
    href: "/csv-tools/csv-to-yaml",
  },
  {
    name: "CSV to SQL",
    description: "Generate SQL INSERT statements from CSV data for MySQL, PostgreSQL, SQLite",
    href: "/csv-tools/csv-to-sql",
  },
  {
    name: "CSV to HTML Table",
    description: "Convert CSV to styled HTML table with CSS classes and responsive layout",
    href: "/csv-tools/csv-to-html",
  },
  {
    name: "CSV to Markdown",
    description: "Convert CSV to GitHub-Flavored Markdown table with alignment options",
    href: "/csv-tools/csv-to-markdown",
  },
  {
    name: "CSV to Array",
    description: "Convert CSV to programming language arrays (JavaScript, Python, PHP, Ruby)",
    href: "/csv-tools/csv-to-array",
  },
  {
    name: "CSV to Text",
    description: "Generate plain text from CSV rows using customizable templates",
    href: "/csv-tools/csv-to-text",
  },
  {
    name: "CSV Column Extractor",
    description: "Extract specific columns from CSV by name or index with reordering",
    href: "/csv-tools/csv-column-extractor",
  },
  {
    name: "CSV Column Remover",
    description: "Remove selected columns from CSV by name or index",
    href: "/csv-tools/csv-column-remover",
  },
  {
    name: "CSV Column Reorder",
    description: "Drag-and-drop interface to reorder CSV columns",
    href: "/csv-tools/csv-column-reorder",
  },
  {
    name: "CSV Column Splitter",
    description: "Split a single CSV column into multiple columns by delimiter or regex",
    href: "/csv-tools/csv-column-splitter",
  },
  {
    name: "CSV Column Merger",
    description: "Combine multiple CSV columns into a single field with custom separator",
    href: "/csv-tools/csv-column-merger",
  },
  {
    name: "CSV Row Filter",
    description: "Filter CSV rows using conditions (equals, contains, regex, comparisons)",
    href: "/csv-tools/csv-row-filter",
  },
  {
    name: "CSV Row Sorter",
    description: "Sort CSV rows by one or more columns with multi-level sorting",
    href: "/csv-tools/csv-row-sorter",
  },
  {
    name: "CSV Row Counter",
    description: "Count rows, blanks, and compute per-column fill rate statistics",
    href: "/csv-tools/csv-row-counter",
  },
  {
    name: "CSV Header Editor",
    description: "Rename, recase, and clean CSV column headers in bulk",
    href: "/csv-tools/csv-header-editor",
  },
  {
    name: "CSV Duplicate Remover",
    description: "Remove duplicate rows from CSV (full-row or key-column based)",
    href: "/csv-tools/csv-duplicate-remover",
  },
  {
    name: "CSV Deduplicator",
    description: "Advanced fuzzy matching for near-duplicate detection with similarity threshold",
    href: "/csv-tools/csv-deduplicator",
  },
  {
    name: "CSV Join/Merge",
    description: "SQL-style joins (inner, left, right, full outer) on two CSV files",
    href: "/csv-tools/csv-join-merge",
  },
  {
    name: "CSV Splitter",
    description: "Split large CSV into multiple files by row count, size, or column groups",
    href: "/csv-tools/csv-splitter",
  },
  {
    name: "CSV File Merger",
    description: "Combine multiple CSV files into one with column alignment strategies",
    href: "/csv-tools/csv-file-merger",
  },
  {
    name: "CSV Delimiter Converter",
    description: "Change CSV delimiter (comma, semicolon, pipe, tab, custom)",
    href: "/csv-tools/csv-delimiter-converter",
  },
  {
    name: "CSV Quote Escaper",
    description: "Apply or normalize quoting to CSV fields (RFC 4180 compliant)",
    href: "/csv-tools/csv-quote-escaper",
  },
  {
    name: "CSV Unquote",
    description: "Remove unnecessary quote characters from over-quoted CSV files",
    href: "/csv-tools/csv-unquote",
  },
  {
    name: "CSV Cleaner",
    description: "Automatically fix common CSV issues: whitespace, blank rows, encoding, BOM",
    href: "/csv-tools/csv-cleaner",
  },
  {
    name: "CSV Data Normalizer",
    description: "Standardize dates, phone numbers, currencies, casing, and boolean values",
    href: "/csv-tools/csv-data-normalizer",
  },
  {
    name: "CSV Transpose",
    description: "Swap rows and columns in any CSV file instantly",
    href: "/csv-tools/csv-transpose",
  },
  {
    name: "CSV Random Row Generator",
    description: "Generate realistic fake CSV data with configurable column types",
    href: "/csv-tools/csv-random-row-generator",
  },
  {
    name: "CSV Sample Generator",
    description: "Extract a random sample from large CSV files (count or percentage)",
    href: "/csv-tools/csv-sample-generator",
  },
  {
    name: "CSV Column Statistics",
    description: "Get instant descriptive statistics for every column in your CSV",
    href: "/csv-tools/csv-column-statistics",
  },
  {
    name: "CSV Email Extractor",
    description: "Pull all valid email addresses from CSV with domain filtering",
    href: "/csv-tools/csv-email-extractor",
  },
];

export const metadata: Metadata = {
  title: "Free CSV Tools Online - 47 Tools for CSV Editing, Conversion & Analysis",
  description:
    "Free online CSV tools for viewing, editing, converting, and analyzing CSV files. Convert CSV to JSON, Excel, SQL, XML, YAML. Clean, format, filter, and transform CSV data in your browser.",
  openGraph: {
    title: "Free CSV Tools Online - 47 Tools for CSV Editing, Conversion & Analysis",
    description:
      "Free online CSV tools for viewing, editing, converting, and analyzing CSV files. Convert CSV to JSON, Excel, SQL, XML, YAML. Clean, format, filter, and transform CSV data in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools",
  },
};

export default function CsvToolsPage() {
  const faqsData = [
    {
      question: "Are these CSV tools really free?",
      answer:
        "Yes. All 47 CSV tools are completely free — no registration, no paywalls, no row limits. Use them as often as you need.",
    },
    {
      question: "Is my CSV data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your files never leave your device or get uploaded to any server.",
    },
    {
      question: "What CSV formats and delimiters are supported?",
      answer:
        "Standard CSV with comma, semicolon, tab, and pipe delimiters. Tools also handle quoted fields, escaped characters, and various line endings (CRLF, LF).",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "There's no hard limit enforced by the tools. Performance depends on your browser's memory — files up to 100MB typically work fine.",
    },
    {
      question: "Do these tools preserve UTF-8 encoding and special characters?",
      answer:
        "Yes. Tools handle UTF-8 encoding, including accented characters, emojis, and non-Latin scripts. Some tools offer BOM (Byte Order Mark) options for Excel compatibility.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free CSV Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online CSV tools for viewing, analyzing, and converting CSV files.
              All processing happens in your browser — fast, private, and secure.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={csvTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Data Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our JSON tools for working with JSON data, or explore all available tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/json-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                JSON Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These CSV Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 47 free CSV tools that run entirely in your browser. No uploads, no server processing, no waiting. You paste CSV data or drop a file, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: viewing and editing CSV files, converting between CSV and other formats (JSON, Excel, SQL, XML, YAML, and more), transforming CSV structure (reordering columns, filtering rows, removing duplicates), and fixing messy CSV data (formatting, cleaning, normalizing).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your CSV into the input box or drag-and-drop a .csv file</li>
              <li>Adjust settings if needed (delimiter, encoding, output format)</li>
              <li>Click Convert, Process, or Apply</li>
              <li>Copy the result or download as a new file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript libraries like PapaParse for CSV parsing and SheetJS for Excel operations. Your data stays in your browser tab.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> convert CSV to JSON for APIs, generate SQL INSERT statements from spreadsheets, or transform data into YAML configuration files.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Data analysts</strong> clean messy exports, filter rows by conditions, extract specific columns, or compute basic statistics before importing into Python or R.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Marketing and operations teams</strong> merge customer lists, remove duplicates from email exports, convert product catalogs between formats, or split large files into smaller batches.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Students and researchers</strong> transpose datasets (swap rows and columns), convert HTML tables from web pages into CSV, or format data for thesis appendices.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Viewing and Editing</h3>
            <p className="text-muted-foreground mb-4">
              CSV Viewer displays files with sorting and pagination. CSV Editor provides a spreadsheet-like interface for cell-by-cell editing. CSV Validator checks structure, column consistency, and encoding issues.
            </p>

            <h3 className="text-xl font-semibold mb-3">Format Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Convert CSV to JSON (with type inference options), Excel (.xlsx), SQL INSERT statements for MySQL/PostgreSQL/SQLite, XML, YAML, HTML tables, Markdown tables, TSV, plain text, or programming language arrays (JavaScript, Python, PHP). Reverse conversions work too — JSON to CSV, Excel to CSV, SQL to CSV, XML to CSV, HTML table to CSV.
            </p>

            <h3 className="text-xl font-semibold mb-3">Column Operations</h3>
            <p className="text-muted-foreground mb-4">
              Extract specific columns by name or index, remove unwanted columns, reorder with drag-and-drop, split one column into multiple by delimiter, or merge several columns into one with a custom separator.
            </p>

            <h3 className="text-xl font-semibold mb-3">Row Operations</h3>
            <p className="text-muted-foreground mb-4">
              Filter rows using conditions (equals, contains, regex, greater than), sort by one or multiple columns, count rows and calculate fill rates, remove exact duplicates or fuzzy near-duplicates.
            </p>

            <h3 className="text-xl font-semibold mb-3">File Operations</h3>
            <p className="text-muted-foreground mb-4">
              Split large CSV files by row count or file size, merge multiple CSV files with column alignment, join two files on a key column (inner, left, right, full outer joins), generate random samples, or create fake test data with realistic column types.
            </p>

            <h3 className="text-xl font-semibold mb-3">Cleaning and Formatting</h3>
            <p className="text-muted-foreground mb-4">
              CSV Formatter standardizes quoting, delimiters, and line endings. CSV Minifier removes unnecessary whitespace and quotes. CSV Cleaner fixes encoding issues, trims whitespace, and removes blank rows. CSV Data Normalizer standardizes dates, phone numbers, currencies, and boolean values. CSV Quote Escaper and CSV Unquote handle over-quoted or under-quoted fields.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>File size:</strong> There's no enforced limit, but browsers have memory constraints. Files over 100MB may cause slow performance or crashes depending on your device.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>CSV dialects:</strong> Tools follow RFC 4180 standards but may not handle exotic edge cases like multi-character delimiters or embedded newlines in quoted fields perfectly.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Excel compatibility:</strong> CSV to Excel creates .xlsx files with basic formatting. Complex Excel features (formulas, macros, pivot tables) aren't supported.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>JSON conversion:</strong> Nested JSON flattens to dot-notation headers (e.g., "address.city"). Deeply nested structures may not convert cleanly back and forth.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              These tools exist because CSV remains the universal interchange format — every database, spreadsheet, and API exports to it. But working with CSV often means opening Excel for simple tasks or writing Python scripts for conversions. These tools sit in the middle: fast, focused utilities that do one thing well without requiring software installation or exposing your data to third-party servers.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
