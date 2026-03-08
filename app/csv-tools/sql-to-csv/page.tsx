import SqlToCsv from "@/components/csv-tools/sql-to-csv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQL to CSV Converter - Extract Data from SQL INSERT Statements to CSV",
  description:
    "Parse SQL INSERT statements and extract data to CSV format. Supports MySQL, PostgreSQL, and SQLite INSERT syntax. Free online SQL to CSV converter.",
  openGraph: {
    title: "SQL to CSV Converter - Extract Data from SQL INSERT Statements to CSV",
    description:
      "Extract CSV data from SQL INSERT scripts for analysis or sharing.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/sql-to-csv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            SQL to CSV Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Extract data from SQL INSERT statements and convert to CSV format. 
            Parse database dumps or backup scripts into spreadsheet-ready data.
          </p>
        </div>

        <SqlToCsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool parses SQL INSERT statements and extracts the row data into CSV format. It uses regex-based parsing to identify INSERT INTO statements, extract column names and values, then outputs clean CSV ready for Excel, Google Sheets, or data analysis tools.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Supported SQL Syntax
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Single-row INSERT:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Multi-row INSERT:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Without column list:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`INSERT INTO users VALUES (1, 'Alice', 'alice@example.com');`}
          </pre>
          <p className="text-muted-foreground mb-6">
            All formats are supported. Column names come from the INSERT statement or are auto-generated as col1, col2, etc.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Conversion Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Delimiter selection:</strong> Choose comma, semicolon, pipe, or tab as the output CSV delimiter.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Automatic parsing:</strong> The tool handles quoted strings, escaped quotes, NULL values, and numeric literals.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Database dump analysis:</strong> Extract data from mysqldump or pg_dump output for quick inspection without restoring the database.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Backup inspection:</strong> View what's in a SQL backup file before restoring it to verify data integrity.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data sharing:</strong> Convert database exports to CSV for sharing with colleagues who don't have database access.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Migration verification:</strong> Compare data before and after migration by converting both to CSV for diff tools.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Report generation:</strong> Extract specific table data from SQL scripts for inclusion in reports or presentations.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How Parsing Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool uses regex patterns to identify:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>INSERT statements:</strong> Matches INSERT INTO table_name and optional column list.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>VALUES clauses:</strong> Extracts parenthesized value tuples.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Quoted strings:</strong> Handles single-quoted strings with escaped quotes ('O''Brien' becomes O'Brien).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>NULL values:</strong> Recognizes NULL keyword and converts to empty CSV cells.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Numeric values:</strong> Integers and floats are extracted as-is without quotes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Gets Extracted
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data values only:</strong> Only the VALUES portion extracts. CREATE TABLE statements, indexes, and constraints are ignored.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Column headers:</strong> If the INSERT has a column list, those become CSV headers. Otherwise, headers are auto-generated (col1, col2, etc.).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Multiple tables:</strong> If the SQL contains INSERT statements for multiple tables, all rows combine into one CSV with the structure of the first INSERT.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Complex SQL:</strong> INSERT...SELECT statements, subqueries, or expressions aren't supported. Only literal VALUES clauses parse correctly.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>BLOB data:</strong> Binary data in hex or base64 format extracts as-is but may not be useful in CSV form.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Very large files:</strong> SQL dump files can be gigabytes in size. This tool works best with files under 20MB.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Dialect variations:</strong> Supports standard INSERT syntax. Vendor-specific extensions may not parse correctly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this work with UPDATE or DELETE statements?</h3>
          <p className="text-muted-foreground mb-4">
            No. This tool only parses INSERT statements. UPDATE and DELETE statements have different syntax and aren't supported.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this handle multi-line INSERT statements?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. The parser handles INSERT statements that span multiple lines, including multi-row VALUES with each row on a separate line.
          </p>

          <h3 className="text-xl font-semibold mb-2">What about escaped quotes in strings?</h3>
          <p className="text-muted-foreground mb-4">
            SQL-style escaped quotes ('O''Brien') are converted to single quotes (O'Brien) in the CSV output.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert CSV back to SQL?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the CSV to SQL tool. You can specify table name, SQL dialect (MySQL, PostgreSQL, SQLite), and batch size for efficient INSERT statements.
          </p>
        </div>
      </div>
    </>
  );
}
