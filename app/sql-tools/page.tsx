import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Database, ArrowRight } from "lucide-react";

const sqlTools = [
  {
    name: "CSV to SQL Converter (INSERTs)",
    description: "Convert CSV data to SQL INSERT statements",
    href: "/sql-tools/csv-to-sql-converter-inserts",
  },
  {
    name: "JSON to SQL Converter",
    description: "Convert JSON arrays to SQL INSERT statements",
    href: "/sql-tools/json-to-sql-converter",
  },
  {
    name: "SQL CASE Converter (Upper/Lower/Proper)",
    description: "Convert SQL keywords to uppercase, lowercase, or proper case",
    href: "/sql-tools/sql-case-converter-upper-lower-proper",
  },
  {
    name: "SQL Date Function Playground",
    description: "Test and learn SQL date functions across databases",
    href: "/sql-tools/sql-date-function-playground",
  },
  {
    name: "SQL Diff/Compare (Schemas & Queries)",
    description: "Compare SQL schemas or queries and highlight differences",
    href: "/sql-tools/sql-diff-compare-schemas-queries",
  },
  {
    name: "SQL Escape/Unescape Tool",
    description: "Escape or unescape special characters in SQL strings",
    href: "/sql-tools/sql-escape-unescape-tool",
  },
  {
    name: "SQL Execution Plan Visualizer",
    description: "Visualize and analyze SQL query execution plans",
    href: "/sql-tools/sql-execution-plan-visualizer",
  },
  {
    name: "SQL Formatter/Beautifier",
    description: "Format and beautify minified SQL queries",
    href: "/sql-tools/sql-formatter-beautifier",
  },
  {
    name: "SQL Index Advisor/Suggest Tool",
    description: "Get index recommendations for SQL queries",
    href: "/sql-tools/sql-index-advisor-suggest-tool",
  },
  {
    name: "SQL Join Types Visualizer",
    description: "Visual explanation of SQL JOIN types with examples",
    href: "/sql-tools/sql-join-types-visualizer",
  },
  {
    name: "SQL Password Hash Generator (MD5/SHA)",
    description: "Generate password hashes for SQL databases",
    href: "/sql-tools/sql-password-hash-generator-md5-sha",
  },
  {
    name: "SQL Query Parser/Tokenizer",
    description: "Parse SQL queries into tokens for analysis",
    href: "/sql-tools/sql-query-parser-tokenizer",
  },
  {
    name: "SQL Query to CSV Export",
    description: "Convert SQL query results to CSV format",
    href: "/sql-tools/sql-query-to-csv-export",
  },
  {
    name: "SQL Query Validator (Syntax Checker)",
    description: "Validate SQL syntax for various database systems",
    href: "/sql-tools/sql-query-validator-syntax-checker",
  },
  {
    name: "SQL Random Data Generator",
    description: "Generate random test data for SQL tables",
    href: "/sql-tools/sql-random-data-generator",
  },
  {
    name: "SQL Regular Expression Tester (REGEXP)",
    description: "Test SQL regular expressions and pattern matching",
    href: "/sql-tools/sql-regular-expression-tester-regexp",
  },
  {
    name: "SQL Stored Procedure Generator",
    description: "Generate stored procedure templates",
    href: "/sql-tools/sql-stored-procedure-generator",
  },
  {
    name: "SQL to JSON Converter",
    description: "Convert SQL INSERT statements to JSON",
    href: "/sql-tools/sql-to-json-converter",
  },
  {
    name: "SQLite Viewer Online",
    description: "View and query SQLite database files in browser",
    href: "/sql-tools/sqlite-viewer-online",
  },
  {
    name: "Visual SQL Query Builder",
    description: "Build SQL queries visually without writing code",
    href: "/sql-tools/visual-sql-query-builder",
  },
];

export const metadata: Metadata = {
  title: "Free SQL Tools Online - 20 SQL Query & Database Tools",
  description:
    "Free online SQL tools for formatting, validating, and converting SQL queries. SQL formatter, query builder, CSV to SQL, JSON to SQL. All tools run in your browser.",
  openGraph: {
    title: "Free SQL Tools Online - 20 SQL Query & Database Tools",
    description:
      "Free online SQL tools for formatting, validating, and converting SQL queries. SQL formatter, query builder, CSV to SQL, JSON to SQL. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/sql-tools",
  },
};

export default function SqlToolsPage() {
  const faqsData = [
    {
      question: "Are these SQL tools really free?",
      answer:
        "Yes. All 20 SQL tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my SQL data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your SQL queries and data never leave your device or get uploaded to any server.",
    },
    {
      question: "Which SQL databases are supported?",
      answer:
        "Tools support major SQL dialects including MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. Some tools are dialect-specific and will indicate compatibility.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Can these tools connect to my database?",
      answer:
        "No. These are client-side tools that run entirely in your browser. They don't connect to external databases. Use SQLite Viewer for local .sqlite files only.",
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
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free SQL Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online SQL tools for formatting, validating, and converting SQL queries.
              SQL formatter, query builder, CSV to SQL — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={sqlTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Data Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our CSV tools or JSON tools for more data utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/csv-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                CSV Tools
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
              What These SQL Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 20 free SQL tools that run entirely in your browser. No software installation, no database connections, no waiting. You paste SQL queries or data, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: formatting and validating SQL (formatter, validator, syntax checker), converting data to/from SQL (CSV to SQL, JSON to SQL, SQL to JSON), learning and understanding SQL (JOIN visualizer, date functions, regex tester), and building SQL queries (visual query builder, stored procedure generator).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your SQL query, CSV data, or JSON</li>
              <li>Select the operation or target database dialect</li>
              <li>Adjust settings like indentation or data types</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript SQL parsers. Your data stays in your browser tab and never touches any server or database.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Database developers</strong> format messy SQL, validate query syntax, generate test data, or convert CSV exports to INSERT statements.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Data analysts</strong> build queries visually, test regular expressions, or convert query results to CSV for spreadsheet analysis.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Backend developers</strong> generate password hashes for user tables, create stored procedure templates, or analyze execution plans.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Students</strong> learn SQL JOIN types with visual examples, practice date functions across databases, or understand query tokenization.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">SQL Formatting</h3>
            <p className="text-muted-foreground mb-4">
              SQL Formatter/Beautifier indents and formats minified SQL. SQL CASE Converter changes keyword casing (UPPER, lower, Proper). SQL Escape/Unescape handles special characters in strings.
            </p>

            <h3 className="text-xl font-semibold mb-3">Data Conversion</h3>
            <p className="text-muted-foreground mb-4">
              CSV to SQL Converter generates INSERT statements from CSV. JSON to SQL Converter transforms JSON arrays to SQL. SQL to JSON Converter does the reverse. SQL Query to CSV Export formats results.
            </p>

            <h3 className="text-xl font-semibold mb-3">SQL Validation</h3>
            <p className="text-muted-foreground mb-4">
              SQL Query Validator checks syntax for various databases. SQL Diff/Compare highlights differences between queries or schemas. SQLite Viewer Online opens local .sqlite files.
            </p>

            <h3 className="text-xl font-semibold mb-3">SQL Learning</h3>
            <p className="text-muted-foreground mb-4">
              SQL JOIN Types Visualizer shows INNER, LEFT, RIGHT, FULL joins with diagrams. SQL Date Function Playground demonstrates date functions across MySQL, PostgreSQL, SQL Server. SQL Regular Expression Tester validates REGEXP patterns.
            </p>

            <h3 className="text-xl font-semibold mb-3">SQL Building</h3>
            <p className="text-muted-foreground mb-4">
              Visual SQL Query Builder creates queries without coding. SQL Stored Procedure Generator produces templates. SQL Random Data Generator creates test data. SQL Index Advisor suggests indexes.
            </p>

            <h3 className="text-xl font-semibold mb-3">SQL Analysis</h3>
            <p className="text-muted-foreground mb-4">
              SQL Execution Plan Visualizer shows query plans. SQL Query Parser/Tokenizer breaks queries into components. SQL Password Hash Generator creates MD5/SHA hashes for user tables.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Dialect differences:</strong> SQL varies between MySQL, PostgreSQL, SQL Server, Oracle. Tools indicate compatibility but always test in your target database.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>No live connections:</strong> These tools don't connect to databases. They process SQL text only. Use SQLite Viewer for local .sqlite files.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Large datasets:</strong> Browser memory limits apply. Very large CSV files or complex queries may cause slowdowns.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Execution plans:</strong> Visualizer shows estimated plans. Actual execution may differ based on statistics, indexes, and data distribution.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              SQL tools often mean installing database clients, paying for IDEs, or using command-line utilities. But sometimes you need to quickly format a messy query, convert a CSV to INSERT statements, or understand how a LEFT JOIN differs from INNER JOIN. These tools exist because working with SQL shouldn't require a database connection or expensive software. Everything runs in your browser — no installation, no connections, no barriers.
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
