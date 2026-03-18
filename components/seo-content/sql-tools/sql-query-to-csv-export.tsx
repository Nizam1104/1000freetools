export default function SqlQueryToCsvExportSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL to CSV converter executes your SELECT queries and exports the results as
            downloadable CSV files, making database data accessible for spreadsheets and analysis tools.
          </p>
          <p className="text-muted-foreground">
            The export process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Query execution:</strong> Enter your SELECT statement and connect to your database (or paste query results).</li>
            <li><strong className="text-foreground">Result formatting:</strong> Query results are formatted as rows and columns with proper handling of NULLs, dates, and special characters.</li>
            <li><strong className="text-foreground">CSV configuration:</strong> Choose delimiters (comma, tab, semicolon), quote styles, and encoding options.</li>
            <li><strong className="text-foreground">File generation:</strong> A CSV file is created and downloaded to your computer, ready for Excel, Google Sheets, or data analysis tools.</li>
          </ol>
          <p className="text-muted-foreground">
            Exporting to CSV makes database data portable and accessible to non-technical stakeholders
            who work primarily in spreadsheets or business intelligence tools.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Business Reporting",
              description: "Export query results for monthly reports, dashboards, or executive summaries in spreadsheet format."
            },
            {
              title: "Data Analysis",
              description: "Move data from databases to statistical tools (R, Python, SPSS) that work better with CSV input."
            },
            {
              title: "Data Sharing",
              description: "Share database extracts with colleagues who don't have database access but need the data."
            },
            {
              title: "Backup and Archiving",
              description: "Create portable CSV backups of important tables that can be restored or audited later."
            },
            {
              title: "Migration Preparation",
              description: "Export data as CSV before migrating to a new system or database platform."
            },
            {
              title: "Compliance and Auditing",
              description: "Generate CSV exports for regulatory reporting, audits, or data retention requirements."
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
              caveat: "Large result sets need pagination",
              explanation: "Exporting millions of rows may timeout or create huge files. Use LIMIT/OFFSET or date ranges for large datasets."
            },
            {
              caveat: "NULL values become empty cells",
              explanation: "Database NULLs export as empty cells in CSV. Some tools distinguish between empty strings and NULL - be aware of this difference."
            },
            {
              caveat: "Date formats may need adjustment",
              explanation: "Database date formats might not match your spreadsheet expectations. Use DATE_FORMAT or TO_CHAR in your query if needed."
            },
            {
              caveat: "Special characters are quoted",
              explanation: "Fields containing commas, quotes, or newlines are automatically quoted. This is standard CSV behavior."
            },
            {
              caveat: "Binary data doesn't export well",
              explanation: "BLOBs, images, and binary columns export as encoded text. Consider excluding them or converting to hex/base64 first."
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
              question: "What's the maximum number of rows I can export?",
              answer: "Depends on your browser and system memory. Typically 100,000-500,000 rows work fine. For larger exports, use database-native tools or command-line utilities."
            },
            {
              question: "Can I export multiple tables at once?",
              answer: "This tool exports one query result at a time. For multiple tables, run separate exports or write a query that joins/combines the data you need."
            },
            {
              question: "How do I include column headers?",
              answer: "Headers are included by default. They come from your SELECT clause - use aliases (SELECT name AS 'Full Name') for custom header names."
            },
            {
              question: "What encoding should I use?",
              answer: "UTF-8 is recommended for international characters. Some older Windows applications may need UTF-8 with BOM or Windows-1252 encoding."
            },
            {
              question: "Can I schedule automatic exports?",
              answer: "This is a manual tool. For scheduled exports, use database job schedulers (cron, SQL Agent, pg_cron) with command-line export tools."
            },
            {
              question: "How do I handle commas in my data?",
              answer: "Fields containing commas are automatically wrapped in quotes. This is standard CSV format and Excel/Google Sheets handle it correctly."
            },
            {
              question: "Can I export directly to Excel format?",
              answer: "This tool creates CSV files. Open CSV in Excel and save as .xlsx if needed. CSV is more universally compatible across tools."
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
