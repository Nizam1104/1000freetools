import React from "react"

export default function JavascriptCsvJsonConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the CSV to JSON Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your CSV data or select JSON to CSV mode. The converter automatically detects the first row as headers and creates object keys from them. Each subsequent row becomes a JSON object.
          </p>
          <p>
            Choose your delimiter: comma, tab, or semicolon. The parser handles quoted fields correctly, preserving commas inside quoted values. Type inference converts numbers and booleans automatically.
          </p>
          <p>
            Output is ready to copy or download. JSON is pretty-printed for readability. CSV output properly escapes special characters. All conversion happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Importing spreadsheet data</h3>
            <p className="text-sm text-muted-foreground">
              Export from Excel as CSV, convert to JSON for your web app. No manual reformatting needed. Perfect for bulk data imports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API data transformation</h3>
            <p className="text-sm text-muted-foreground">
              Your API expects JSON but you have CSV data. Convert instantly without writing transformation code. Speeds up development significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating test fixtures</h3>
            <p className="text-sm text-muted-foreground">
              Generate test data in a spreadsheet, export as CSV, convert to JSON fixtures. Much faster than hand-writing test data objects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exporting database results</h3>
            <p className="text-sm text-muted-foreground">
              Query results come as CSV. Convert to JSON for frontend consumption. Share data with team members in their preferred format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating between systems</h3>
            <p className="text-sm text-muted-foreground">
              Old system exports CSV, new system needs JSON. Use this as a quick migration tool. No custom scripts required for one-time conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning data formats</h3>
            <p className="text-sm text-muted-foreground">
              See how CSV rows map to JSON objects. Understand the relationship between these common data formats. Great for students and new developers.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First row is always headers.</strong>
              The converter treats the first line as column names. If your CSV has no headers, add a dummy first row. Headers become JSON keys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Type inference is automatic.</strong>
              "123" becomes number 123. "true" becomes boolean true. Empty cells become empty strings. This may not match your expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quoted fields handle special chars.</strong>
              Commas inside quotes are preserved. Newlines in quoted fields work correctly. The parser follows RFC 4180 CSV standards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested structures aren't supported.</strong>
              CSV is flat. You can't represent nested JSON objects directly. Each CSV row becomes a flat JSON object.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex data with nested structures, consider using a dedicated ETL tool or writing custom transformation code. This converter excels at flat tabular data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it handle large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files up to a few thousand rows work well. For larger datasets, use command-line tools or server-side processing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What encoding does it support?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 is standard. Most modern CSV files work fine. Files with special characters from other encodings may need conversion first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve data types?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers and booleans are inferred. Dates remain as strings. Complex types become strings. JSON doesn't have a native date type.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the output format?</h3>
            <p className="text-sm text-muted-foreground">
              JSON is pretty-printed by default. For minified output, use a JSON minifier after conversion. CSV delimiter is customizable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about empty rows?</h3>
            <p className="text-sm text-muted-foreground">
              Empty rows are skipped. Rows with fewer columns get empty strings for missing values. Extra columns are ignored if headers don't match.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Mostly. JSON to CSV loses type information - everything becomes strings. Structure is preserved but exact types may differ on round-trip.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Excel files directly?</h3>
            <p className="text-sm text-muted-foreground">
              Export Excel as CSV first, then use this tool. Direct .xlsx support would require additional libraries. CSV is the universal interchange format.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
