export default function CsvToSqlConverterInsertsSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This CSV to SQL converter transforms spreadsheet data into SQL INSERT statements,
            generating ready-to-execute code for importing CSV data into your database.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">CSV parsing:</strong> Upload or paste your CSV data. The tool reads headers and rows, handling quoted fields and escaped characters.</li>
            <li><strong className="text-foreground">Column mapping:</strong> Match CSV columns to database table columns. Specify the target table name for the INSERT statements.</li>
            <li><strong className="text-foreground">Type detection:</strong> Values are analyzed to determine if they're strings, numbers, dates, or NULLs for proper SQL formatting.</li>
            <li><strong className="text-foreground">Statement generation:</strong> INSERT INTO statements are created with proper quoting, escaping, and value formatting for your database dialect.</li>
          </ol>
          <p className="text-muted-foreground">
            This approach gives you full control over the import process and works with any
            database that accepts standard SQL INSERT statements.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Migrating from Spreadsheets",
              description: "Convert Excel or Google Sheets exports into SQL for importing into a proper database."
            },
            {
              title: "Bulk Data Import",
              description: "Load large datasets from CSV exports of other systems into your database tables."
            },
            {
              title: "Test Data Population",
              description: "Generate INSERT statements from sample CSV data to populate development environments."
            },
            {
              title: "Client Data Onboarding",
              description: "Import customer-provided CSV files into your application database during setup."
            },
            {
              title: "Backup and Restore",
              description: "Create portable SQL scripts from CSV backups that can restore data to any compatible database."
            },
            {
              title: "Data Sharing",
              description: "Convert database exports to CSV, then back to SQL for sharing with teams using different databases."
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
              caveat: "Large files may be slow",
              explanation: "CSV files with thousands of rows generate massive SQL scripts. Consider batching or using LOAD DATA for very large imports."
            },
            {
              caveat: "Special characters need escaping",
              explanation: "Quotes, backslashes, and newlines in CSV data are properly escaped, but verify the output for your specific data."
            },
            {
              caveat: "Date formats vary by database",
              explanation: "Date columns may need format adjustment. MySQL, PostgreSQL, and SQL Server expect different date string formats."
            },
            {
              caveat: "NULL handling differs",
              explanation: "Empty CSV cells become NULL, but some databases distinguish between empty strings and NULL. Check your requirements."
            },
            {
              caveat: "No constraint validation",
              explanation: "Generated INSERT statements don't check foreign keys or unique constraints. Invalid data will cause execution errors."
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
              question: "What CSV formats are supported?",
              answer: "Standard CSV with comma delimiters, quoted fields, and escaped quotes. Tab-separated values (TSV) and other delimiters may need preprocessing."
            },
            {
              question: "Can I import directly without generating SQL?",
              answer: "Most databases have bulk import tools (LOAD DATA INFILE, COPY, BULK INSERT) that are faster for large files. This tool generates SQL for flexibility."
            },
            {
              question: "How are NULL values handled?",
              answer: "Empty CSV cells become NULL in the SQL. If you need empty strings instead, configure this in the column mapping options."
            },
            {
              question: "What about CSV files with no headers?",
              answer: "Headerless CSVs can be imported by specifying column names manually. The first row will be treated as data, not column names."
            },
            {
              question: "Is there a row limit?",
              answer: "No hard limit, but very large files may cause browser memory issues. For 10,000+ rows, consider splitting the CSV or using database-native import tools."
            },
            {
              question: "Can I update existing records instead of inserting?",
              answer: "This tool generates INSERT statements. For updates, you'd need to add WHERE clauses manually or use database-specific UPSERT syntax."
            },
            {
              question: "How do I handle special characters in data?",
              answer: "The converter automatically escapes quotes and backslashes. Non-ASCII characters (accents, emojis) are preserved in UTF-8 encoding."
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
