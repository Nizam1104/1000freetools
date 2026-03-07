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
    name: "JSON to CSV",
    description: "Flatten JSON arrays of objects into CSV with nested object handling",
    href: "/csv-tools/json-to-csv",
  },
  {
    name: "CSV to Excel",
    description: "Convert CSV to formatted .xlsx spreadsheets with styled headers",
    href: "/csv-tools/csv-to-excel",
  },
  {
    name: "Excel to CSV",
    description: "Extract sheets from .xlsx/.xls files and convert to CSV",
    href: "/csv-tools/excel-to-csv",
  },
  {
    name: "CSV to TSV",
    description: "Convert comma-delimited CSV to tab-separated values (TSV)",
    href: "/csv-tools/csv-to-tsv",
  },
  {
    name: "TSV to CSV",
    description: "Convert tab-separated value files to standard CSV",
    href: "/csv-tools/tsv-to-csv",
  },
  {
    name: "CSV to XML",
    description: "Transform CSV rows into XML elements with configurable structure",
    href: "/csv-tools/csv-to-xml",
  },
  {
    name: "XML to CSV",
    description: "Parse XML and extract repeating element structures into CSV",
    href: "/csv-tools/xml-to-csv",
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
    name: "SQL to CSV",
    description: "Extract row data from SQL INSERT scripts into CSV format",
    href: "/csv-tools/sql-to-csv",
  },
  {
    name: "CSV to HTML Table",
    description: "Convert CSV to styled HTML table with CSS classes and responsive layout",
    href: "/csv-tools/csv-to-html",
  },
  {
    name: "HTML Table to CSV",
    description: "Scrape HTML tables from pasted HTML and export as CSV",
    href: "/csv-tools/html-to-csv",
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
    name: "Text to CSV",
    description: "Parse unstructured text and convert to structured CSV",
    href: "/csv-tools/text-to-csv",
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
  title: "Free CSV Tools",
  description:
    "Free online CSV tools. View, analyze, and convert CSV files with ease.",
  openGraph: {
    title: "Free CSV Tools",
    description:
      "Free online CSV tools. View, analyze, and convert CSV files with ease.",
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
        "Yes! All CSV tools are completely free to use. No registration, no paywalls, no limits.",
    },
    {
      question: "Is my CSV data private and secure?",
      answer:
        "Absolutely. All CSV processing happens directly in your browser. Your files never leave your device or get stored on our servers.",
    },
    {
      question: "What CSV formats are supported?",
      answer:
        "We support standard CSV files with various delimiters including comma, semicolon, tab, and pipe-separated values.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once loaded in your browser, most tools function without an active internet connection since all processing is done locally.",
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

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools provides free online CSV and data tools for developers,
              analysts, and business professionals. All processing happens directly
              in your browser, so your data stays private and never touches our servers.
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
