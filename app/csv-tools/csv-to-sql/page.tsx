import CsvToSql from "@/components/csv-tools/csv-to-sql";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to SQL Converter - Generate INSERT Statements for MySQL, PostgreSQL, SQLite",
  description:
    "Convert CSV files to SQL INSERT statements. Supports MySQL, PostgreSQL, and SQLite dialects with configurable batch sizes. Free online CSV to SQL converter.",
  openGraph: {
    title: "CSV to SQL Converter - Generate INSERT Statements for MySQL, PostgreSQL, SQLite",
    description:
      "Generate SQL INSERT statements from CSV for database imports.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-sql",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvToSql />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into SQL INSERT statements ready for database import. Each CSV row becomes a row in your database table. You can specify the table name, choose the SQL dialect, and control how many rows per INSERT statement for optimal performance.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            SQL Generation Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Table name:</strong> Specify the target table name for INSERT statements. Use schema-qualified names like "public.users" if needed.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>SQL dialect:</strong> Choose MySQL, PostgreSQL, or SQLite. Each has slightly different escaping rules and syntax conventions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Batch size:</strong> Control how many rows per INSERT statement. Larger batches (100-1000) import faster but use more memory.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>NULL handling:</strong> Empty CSV cells become SQL NULL values in the INSERT statements.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Output
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,age
Alice,alice@example.com,30
Bob,bob@example.com,25`}
          </pre>
          <p className="text-muted-foreground mb-4">Output SQL:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`INSERT INTO users (name, email, age)
VALUES
('Alice', 'alice@example.com', 30),
('Bob', 'bob@example.com', 25);`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Database seeding:</strong> Populate development or test databases with sample data from CSV exports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data migration:</strong> Import data from legacy systems that export to CSV into modern relational databases.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Bulk inserts:</strong> Insert large datasets more efficiently than row-by-row application inserts.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Backup restoration:</strong> Restore data from CSV backups when binary dumps aren't available.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Quick imports:</strong> Get data into a database quickly without writing import scripts or using GUI tools.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            SQL Dialect Differences
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>MySQL:</strong> Uses backtick escaping for identifiers, double-quotes for string literals. Supports multi-row INSERT efficiently.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>PostgreSQL:</strong> Uses double-quotes for identifiers, single-quotes for strings. COPY command is faster for large imports but requires file access.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>SQLite:</strong> Similar to PostgreSQL for INSERT syntax. Use .import command for file-based imports, or run INSERT statements directly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Batch Size Considerations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Small batches (1-10 rows):</strong> Easier to debug, smaller transactions, but slower for large datasets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Medium batches (10-100 rows):</strong> Good balance of performance and manageability. Recommended for most cases.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large batches (100-1000 rows):</strong> Fastest for bulk imports, but may hit packet size limits or cause memory issues.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Very large batches (1000+):</strong> May exceed max_allowed_packet in MySQL or cause timeout issues. Use with caution.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            SQL Escaping and Safety
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool properly escapes values for SQL:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Single quotes:</strong> Escaped by doubling (' becomes '') per SQL standard.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Backslashes:</strong> Escaped for MySQL (\\ becomes \\\\).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>NULL values:</strong> Empty cells become NULL (unquoted) in SQL.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Numbers:</strong> Numeric values are inserted unquoted for proper type handling.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>No schema creation:</strong> This tool generates INSERT statements only. You must create the table structure separately.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>No data validation:</strong> Values aren't validated against your schema. Type mismatches cause SQL errors during import.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Files over 20MB may generate very large SQL files. Consider splitting or using database-native import tools.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Binary data:</strong> CSV can't represent binary data. BLOB columns require different import methods.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">How do I run the generated SQL?</h3>
          <p className="text-muted-foreground mb-4">
            Save the output as a .sql file and run it with your database client: mysql, psql, sqlite3, or through a GUI tool like phpMyAdmin, pgAdmin, or DBeaver.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this handle special characters?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Quotes, backslashes, and other special characters are properly escaped for SQL syntax.
          </p>

          <h3 className="text-xl font-semibold mb-2">What about auto-increment IDs?</h3>
          <p className="text-muted-foreground mb-4">
            If your CSV has an ID column, it will be inserted. For auto-increment, either omit the ID column from CSV or from the INSERT statement column list.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert SQL back to CSV?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the SQL to CSV tool. It extracts row data from INSERT statements and converts to CSV format.
          </p>
        </div>
      </div>
    </>
  );
}
