import * as React from "react"

export default function BatchTimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Paste multiple timestamps or dates into the input area, one per line. The converter processes all entries simultaneously, transforming each to your selected output format.
          </p>
          <p>
            The tool auto-detects input formats - mixing Unix timestamps, ISO 8601 dates, and human-readable dates in the same batch is supported. Each line is processed independently.
          </p>
          <p>
            Results display in a table with original input and converted output side by side. Invalid entries are flagged with error messages. Export results as CSV, copy to clipboard, or download as file.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Migration</h3>
            <p className="text-sm text-muted-foreground">
              Convert timestamp columns when migrating data between systems with different formats.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">CSV Processing</h3>
            <p className="text-sm text-muted-foreground">
              Transform timestamp columns in CSV exports before importing to new systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Aggregation</h3>
            <p className="text-sm text-muted-foreground">
              Normalize timestamps from multiple log sources to consistent format for analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Report Generation</h3>
            <p className="text-sm text-muted-foreground">
              Convert database timestamps to readable dates for reports and presentations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Cleaning</h3>
            <p className="text-sm text-muted-foreground">
              Standardize inconsistent timestamp formats in datasets before analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">ETL Processes</h3>
            <p className="text-sm text-muted-foreground">
              Transform timestamps during Extract-Transform-Load pipelines for data warehouses.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Input format:</strong> One timestamp per line. Empty lines are skipped. Lines with invalid data show errors but don't stop processing.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Mixed formats:</strong> Different lines can use different formats. The converter detects each line's format independently.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Batch size:</strong> Handles hundreds to thousands of timestamps depending on browser. Very large batches may take a few seconds.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Export options:</strong> Copy to clipboard for small batches, download CSV for larger datasets, or export as JSON for programmatic use.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Error handling:</strong> Invalid entries are marked but don't stop processing. Review error messages to fix problematic inputs.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How many timestamps can I convert at once?</h3>
            <p className="text-sm text-muted-foreground">
              Hundreds to thousands depending on your browser. For very large files (10,000+), consider processing in chunks.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I mix different timestamp formats?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Each line is detected and parsed independently. Mix Unix timestamps, ISO dates, and readable dates freely.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I export the results?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Copy button for clipboard, Download CSV for spreadsheet import, or Download JSON for programmatic use.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if some timestamps are invalid?</h3>
            <p className="text-sm text-muted-foreground">
              Invalid entries are marked with error messages. Valid entries are still converted. Fix errors and re-process if needed.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert from a file?</h3>
            <p className="text-sm text-muted-foreground">
              Copy timestamps from your file and paste into the input area. For very large files, consider command-line tools instead.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What output formats are available?</h3>
            <p className="text-sm text-muted-foreground">
              Unix seconds, Unix milliseconds, ISO 8601, human-readable, RFC 2822, and more. Select your preferred format before converting.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is my data sent to a server?</h3>
            <p className="text-sm text-muted-foreground">
              No. All processing happens in your browser. Your timestamp data never leaves your computer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
