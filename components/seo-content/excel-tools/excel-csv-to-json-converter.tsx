import React from "react"

export default function ExcelCsvToJsonConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the CSV to JSON Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV file or paste the data directly. Select the delimiter that matches your file: comma, tab, or semicolon. The converter parses each row into a JSON object.
          </p>
          <p>
            First row becomes the keys for all objects. Type inference converts numbers and booleans automatically. Toggle pretty print for readable formatting or compact for minimal size.
          </p>
          <p>
            Results appear as a JSON array. Copy to clipboard or download as .json file. Ready for API testing, configuration files, or JavaScript applications. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for web apps</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript works natively with JSON. Convert spreadsheet data for frontend consumption. Load directly with fetch() or require().
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating configuration files</h3>
            <p className="text-sm text-muted-foreground">
              Manage configs in Excel, export as JSON. Non-technical team members can edit spreadsheets. Your app reads JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API testing and mocking</h3>
            <p className="text-sm text-muted-foreground">
              Create realistic API responses from CSV data. Test your frontend with proper JSON structures. No backend needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Importing to databases</h3>
            <p className="text-sm text-muted-foreground">
              Many NoSQL databases accept JSON. Convert CSV exports for MongoDB, CouchDB, or document stores. Streamlined data migration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Static site generation</h3>
            <p className="text-sm text-muted-foreground">
              Content in spreadsheets, output as JSON for Gatsby, Next.js, or Hugo. Non-developers manage content easily.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data analysis pipelines</h3>
            <p className="text-sm text-muted-foreground">
              Convert CSV to JSON for JavaScript-based analysis. Use D3.js, Chart.js, or custom visualizations. Flexible data format.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First row must be headers.</strong>
              Column names become JSON keys. If your CSV has no headers, add a first row with field names. Meaningful keys make better JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Type inference is automatic.</strong>
              "123" becomes number 123. "true" becomes boolean. Empty cells become empty strings. Review output for expected types.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are escaped.</strong>
              Quotes, newlines, and backslashes are properly escaped in JSON output. Valid JSON is guaranteed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is always an array.</strong>
              Each row becomes an object. All objects are in a top-level array. This is the standard format for most uses.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For nested JSON structures, flatten your data first or use a tool that supports hierarchical conversion. This tool creates flat objects from tabular data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files with thousands of rows work fine. Very large files may need command-line tools or streaming converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What encoding is supported?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 is standard. Most modern CSV files work correctly. Files with special characters from other encodings may need conversion first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are dates handled?</h3>
            <p className="text-sm text-muted-foreground">
              Dates remain as strings. JSON has no native date type. Parse dates in your application code after loading the JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize key names?</h3>
            <p className="text-sm text-muted-foreground">
              Edit the header row in your CSV before conversion. Or transform the JSON after conversion using map() or a script.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about null values?</h3>
            <p className="text-sm text-muted-foreground">
              Empty cells become empty strings. For null values, you'd need to post-process the JSON. This tool keeps simple string representation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is pretty print necessary?</h3>
            <p className="text-sm text-muted-foreground">
              No, it's for readability. Compact JSON is smaller and faster to parse. Use pretty print for debugging, compact for production.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, conversion happens entirely in your browser. No data is uploaded to servers. Safe for sensitive business data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
