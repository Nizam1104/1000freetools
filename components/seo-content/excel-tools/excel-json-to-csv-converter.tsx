import React from "react"

export default function ExcelJsonToCsvConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JSON to CSV Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JSON array or single object. The converter extracts all unique keys from your data to create CSV headers. Each object becomes a row in the output.
          </p>
          <p>
            Choose your delimiter: comma, tab, or semicolon. The converter properly escapes values containing delimiters, quotes, or newlines. Nested objects are stringified.
          </p>
          <p>
            Results appear as CSV text ready to copy or download. Open directly in Excel, Google Sheets, or any spreadsheet application. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exporting API data to Excel</h3>
            <p className="text-sm text-muted-foreground">
              Got JSON from an API? Convert to CSV for analysis in Excel. Share with colleagues who prefer spreadsheets over JSON.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating reports from databases</h3>
            <p className="text-sm text-muted-foreground">
              Export query results as JSON, convert to CSV for reporting. Stakeholders can open in their preferred tool. Universal format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Importing to other systems</h3>
            <p className="text-sm text-muted-foreground">
              Many systems accept CSV imports. Convert your JSON export for migration. Move data between platforms easily.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing JavaScript data</h3>
            <p className="text-sm text-muted-foreground">
              console.log your data as JSON, convert to CSV. Analyze in Excel with pivot tables and charts. Best of both worlds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing data with non-developers</h3>
            <p className="text-sm text-muted-foreground">
              Business teams prefer Excel. Convert your JSON data to CSV they can open. Better collaboration across teams.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving API responses</h3>
            <p className="text-sm text-muted-foreground">
              Store historical API data as CSV. Smaller than JSON, easier to browse. Long-term data preservation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Input should be an array of objects.</strong>
              Each object becomes a row. Single objects are wrapped in an array. Arrays of primitives aren't supported.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">All unique keys become columns.</strong>
              If objects have different keys, all are included. Missing values become empty cells. This handles inconsistent data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested objects are stringified.</strong>
              Complex values become JSON strings in the CSV cell. They're preserved but not flattened. Parse them after import if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are escaped.</strong>
              Values with commas, quotes, or newlines are properly quoted. Standard CSV format ensures Excel compatibility.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For deeply nested JSON, flatten the structure first or use a tool with nested field support. This converter handles flat arrays of objects best.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it handle large JSON files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files with thousands of objects work fine. Very large files may need streaming converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about arrays inside objects?</h3>
            <p className="text-sm text-muted-foreground">
              Arrays are converted to JSON strings in the cell. They're preserved but not expanded. Parse after importing to Excel if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are null values handled?</h3>
            <p className="text-sm text-muted-foreground">
              Null and undefined become empty cells in CSV. This matches Excel's handling of missing data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I choose which fields to export?</h3>
            <p className="text-sm text-muted-foreground">
              This tool exports all fields. For selective export, filter your JSON first using map() or a script.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve data types?</h3>
            <p className="text-sm text-muted-foreground">
              CSV is text-only. Numbers and booleans become strings. Excel may re-interpret them on import, but not guaranteed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What encoding is used?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 encoding. Supports international characters. Excel may need to import with UTF-8 specified for correct display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, conversion happens entirely in your browser. No data is uploaded to servers. Safe for sensitive information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
