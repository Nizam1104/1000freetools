export default function SqlToCsvConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts SQL query results (in table format) to CSV (Comma-Separated Values), 
            making database output portable for spreadsheets, reports, and data analysis.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Table parsing:</strong> The SQL result table format is parsed to extract headers and row data.</li>
            <li><strong className="text-foreground">Field extraction:</strong> Values are extracted from each cell, handling borders and formatting characters.</li>
            <li><strong className="text-foreground">CSV formatting:</strong> Values are properly quoted and escaped according to CSV standards.</li>
            <li><strong className="text-foreground">Output generation:</strong> The CSV is formatted with the selected delimiter and can be downloaded.</li>
          </ol>
          <p className="text-muted-foreground">
            This is particularly useful when copying query results from database clients 
            that display results in ASCII table format, enabling easy export to Excel or other tools.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Report Generation",
              description: "Convert database query results to CSV for importing into reporting tools or spreadsheets."
            },
            {
              title: "Data Analysis",
              description: "Export query results for analysis in Excel, Google Sheets, or data science tools."
            },
            {
              title: "Data Sharing",
              description: "Share database results with colleagues who don't have database access but need the data."
            },
            {
              title: "Backup Export",
              description: "Create portable CSV backups of specific query results for archival purposes."
            },
            {
              title: "Migration Preparation",
              description: "Export data from one system as CSV before importing into another system."
            },
            {
              title: "Documentation",
              description: "Include data samples in documentation by converting query results to a portable format."
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
              caveat: "Input format must be recognized",
              explanation: "This tool expects SQL result tables in ASCII box format (with +---+ borders). Raw query output without formatting may not parse correctly."
            },
            {
              caveat: "Large result sets may be truncated",
              explanation: "Database clients often truncate wide columns. Ensure your full data is visible in the copied result before conversion."
            },
            {
              caveat: "Special characters need quoting",
              explanation: "Values containing commas, quotes, or newlines are automatically quoted in the CSV output according to RFC 4180 standards."
            },
            {
              caveat: "NULL values become empty",
              explanation: "SQL NULL values typically appear as empty cells or 'NULL' text in results. The conversion preserves what's displayed."
            },
            {
              caveat: "Encoding may vary",
              explanation: "CSV is plain text. Ensure your database client uses UTF-8 encoding for proper handling of international characters."
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
              question: "What SQL result formats are supported?",
              answer: "ASCII table format with +---+ borders (common in MySQL CLI, psql). Some tools also support tab-separated or plain text formats."
            },
            {
              question: "Can I choose the CSV delimiter?",
              answer: "Yes, options typically include comma, semicolon, tab, and pipe. Choose based on your target application's requirements."
            },
            {
              question: "How are quotes handled in the output?",
              answer: "Fields containing quotes are wrapped in quotes, and internal quotes are doubled (standard CSV escaping). This ensures proper parsing."
            },
            {
              question: "Can I export directly from my database?",
              answer: "Most databases support direct CSV export (SELECT ... INTO OUTFILE, COPY TO, etc.). This tool is for converting already-copied results."
            },
            {
              question: "What about very wide tables?",
              answer: "Wide tables may wrap or truncate in terminal output. Adjust your database client's width settings or export directly for better results."
            },
            {
              question: "Is the header row included?",
              answer: "Yes, by default the column names from the SQL result are included as the first row. This can typically be disabled if needed."
            },
            {
              question: "How do I import the CSV into Excel?",
              answer: "Open Excel, go to Data > From Text/CSV, select the file. Excel will auto-detect the format. Verify the preview looks correct before loading."
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
