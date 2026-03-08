import CsvValidator from "@/components/csv-tools/csv-validator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Validator - Check CSV Structure, Encoding & Data Types",
  description:
    "Validate CSV files for structure errors, column consistency, encoding issues, and data type detection. Get detailed reports on row counts, blank rows, and data quality.",
  openGraph: {
    title: "CSV Validator - Check CSV Structure, Encoding & Data Types",
    description:
      "Validate CSV files for structure errors, column consistency, encoding issues, and data type detection.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-validator",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Validator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Validate CSV structure, check for encoding issues, detect data types, 
            and identify problems before importing into databases or analytics tools.
          </p>
        </div>

        <CsvValidator />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What the CSV Validator Checks
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool analyzes your CSV file for structural problems that cause import failures. It checks column count consistency across rows, detects encoding issues like BOM markers or mixed line endings, identifies data types in each column, and flags empty or malformed rows.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Validation Results You Get
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Structure check:</strong> Verifies every row has the same number of columns as the header. Inconsistent column counts break database imports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Encoding analysis:</strong> Detects BOM (Byte Order Mark), mixed line endings (CRLF vs LF), non-ASCII characters, and null bytes that cause parsing errors.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data type detection:</strong> Analyzes each column to identify booleans, numbers, dates, emails, or text with confidence scoring.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row statistics:</strong> Counts total rows, blank rows, empty values, and calculates per-column fill rates.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Error and warning lists:</strong> Specific line numbers and descriptions for every issue found, so you can fix problems quickly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This Tool
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Before database imports:</strong> MySQL, PostgreSQL, and BigQuery fail on malformed CSV. Validate first to catch column mismatches or encoding problems.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>After data exports:</strong> CRM and analytics exports sometimes produce inconsistent rows or weird encodings. Check before sharing with your team.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>For data quality audits:</strong> Quickly assess fill rates, spot empty columns, or identify which fields have the most missing values.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>When debugging import errors:</strong> Get specific line numbers and error descriptions instead of vague "import failed" messages.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Common CSV Problems This Catches
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Wrong column count:</strong> Row 847 has 5 columns but header has 8 — usually from embedded newlines or unescaped delimiters.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>BOM markers:</strong> Windows Excel adds a BOM that breaks some parsers. This tool detects and reports it.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Mixed line endings:</strong> Files edited on both Windows and Mac have mixed CRLF and LF endings that confuse parsers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Encoding corruption:</strong> Non-ASCII characters (accented letters, emojis) may display as garbled text if encoding is wrong.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Blank or duplicate rows:</strong> Empty rows at file end or accidental duplicates from copy-paste errors.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Data Type Detection Details
          </h2>
          <p className="text-muted-foreground mb-4">
            The validator analyzes values in each column and guesses the data type:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Boolean:</strong> Detects true/false, yes/no, 1/0 patterns with 80%+ consistency.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Numeric:</strong> Identifies integer and decimal numbers, including negative values and scientific notation.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Date:</strong> Recognizes common formats like YYYY-MM-DD, MM/DD/YYYY, DD-MM-YYYY.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Email:</strong> Validates against standard email regex pattern.
          </p>
          <p className="text-muted-foreground mb-6">
            Confidence scores show how certain the detection is — 100% means all non-empty values match the pattern.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Type detection is heuristic:</strong> The tool guesses based on patterns. A column with values "1", "2", "three" might show as numeric with 67% confidence.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Doesn't fix errors:</strong> This validator reports problems but doesn't auto-correct them. Use CSV Cleaner or CSV Formatter for fixes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What does "inconsistent column count" mean?</h3>
          <p className="text-muted-foreground mb-4">
            Every row in a valid CSV should have the same number of columns as the header. If row 50 has 6 values but the header has 8, something's wrong — usually an unescaped comma or embedded newline in a field.
          </p>

          <h3 className="text-xl font-semibold mb-2">What is a BOM and why does it matter?</h3>
          <p className="text-muted-foreground mb-4">
            BOM (Byte Order Mark) is a special character Windows Excel adds at the start of UTF-8 files. Some parsers treat it as part of the first column header, causing "ï»¿ColumnName" issues.
          </p>

          <h3 className="text-xl font-semibold mb-2">Why are there blank rows in my CSV?</h3>
          <p className="text-muted-foreground mb-4">
            Blank rows often come from copy-paste errors, spreadsheet software adding trailing newlines, or data exports that include empty records. They can break imports that expect continuous data.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this validate CSV against a schema?</h3>
          <p className="text-muted-foreground mb-4">
            No. This tool checks structural validity (column counts, encoding) and detects data types, but doesn't validate against custom schemas or business rules like "email must be unique."
          </p>

          <h3 className="text-xl font-semibold mb-2">How large of files can this validate?</h3>
          <p className="text-muted-foreground mb-6">
            Files up to 100MB work well. Larger files depend on your browser's memory. The validator processes the entire file to check consistency, so very large files may take time.
          </p>
        </div>
      </div>
    </>
  );
}
