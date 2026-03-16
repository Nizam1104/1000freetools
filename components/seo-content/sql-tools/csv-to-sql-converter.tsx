export default function CsvToSqlConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts CSV (Comma-Separated Values) data into SQL INSERT statements, 
            making it easy to import spreadsheet data into database tables.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">CSV parsing:</strong> The input is split into rows, and each row is parsed into individual fields, handling quoted values and escaped characters.</li>
            <li><strong className="text-foreground">Header extraction:</strong> The first row is used as column names (if headers are enabled).</li>
            <li><strong className="text-foreground">SQL generation:</strong> For each data row, an INSERT statement is created with properly escaped values.</li>
            <li><strong className="text-foreground">Output formatting:</strong> Statements are formatted for readability and can be downloaded as a .sql file.</li>
          </ol>
          <p className="text-muted-foreground">
            This eliminates the tedious manual work of converting spreadsheet data to SQL, 
            reducing errors and saving significant time during data import tasks.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Database Seeding",
              description: "Convert test data from spreadsheets into SQL INSERT statements for populating development databases."
            },
            {
              title: "Data Migration",
              description: "Import data exported from legacy systems (as CSV) into new database schemas."
            },
            {
              title: "Bulk Data Import",
              description: "Load large datasets from business spreadsheets into database tables for reporting or analysis."
            },
            {
              title: "Content Management",
              description: "Import product catalogs, user lists, or content items prepared in spreadsheet form."
            },
            {
              title: "Data Sharing",
              description: "Export database data as CSV for sharing, then provide SQL for recipients to import."
            },
            {
              title: "Backup and Restore",
              description: "Create portable SQL backups of specific tables that can be easily versioned and restored."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "CSV format variations exist",
              explanation: "Different systems export CSV with different delimiters (comma, semicolon, tab) and quote styles. Select the correct options for your CSV format."
            },
            {
              caveat: "Data types aren't inferred",
              explanation: "All values are inserted as strings. You may need to modify the SQL to cast values to appropriate types (INTEGER, DATE, etc.)."
            },
            {
              caveat: "Table must exist first",
              explanation: "This tool generates INSERT statements only. Create the target table with appropriate schema before running the INSERT statements."
            },
            {
              caveat: "Large files may cause issues",
              explanation: "Very large CSV files may cause browser memory issues. For files over 10MB, consider command-line tools or database-specific import features."
            },
            {
              caveat: "Special characters need handling",
              explanation: "Values containing the delimiter or quotes must be properly quoted in the CSV. The tool handles standard CSV escaping."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What CSV formats does this support?",
              answer: "Standard RFC 4180 CSV with configurable delimiters (comma, semicolon, tab, pipe). Supports quoted fields, escaped quotes, and optional header rows."
            },
            {
              question: "Can I specify the table name?",
              answer: "Yes, you can set the target table name. The generated INSERT statements will use this table name in the SQL output."
            },
            {
              question: "How are NULL values handled?",
              answer: "Empty CSV cells become empty strings by default. Some tools allow configuring empty cells to become SQL NULL - check the options."
            },
            {
              question: "What about date values?",
              answer: "Dates are inserted as strings. Ensure your CSV date format matches your database's expected date format, or use DATE() functions in post-processing."
            },
            {
              question: "Can I import directly without generating SQL?",
              answer: "Most databases have native CSV import (LOAD DATA INFILE for MySQL, COPY for PostgreSQL). These are faster for large files but less flexible."
            },
            {
              question: "How do I handle CSV files with no headers?",
              answer: "Disable the header option. Columns will be named generically (column_1, column_2) or you can edit the generated SQL to use your column names."
            },
            {
              question: "Is the generated SQL optimized for bulk inserts?",
              answer: "This tool generates individual INSERT statements. For better performance with large datasets, consider combining into multi-row INSERTs."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
