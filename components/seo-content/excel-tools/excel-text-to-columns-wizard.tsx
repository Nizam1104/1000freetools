import React from "react"

export default function ExcelTextToColumnsWizardSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Text to Columns Wizard Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV data or paste it directly. Choose between delimited splitting (by character) or fixed-width splitting (by position). Preview your data as you configure.
          </p>
          <p>
            For delimited: select comma, tab, space, semicolon, or enter a custom character. For fixed-width: specify column widths as comma-separated numbers. The wizard splits your text accordingly.
          </p>
          <p>
            Results show your data with columns separated. Download as CSV or copy to clipboard. Like Excel's Text to Columns feature, but online and instant. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Splitting exported data</h3>
            <p className="text-sm text-muted-foreground">
              Legacy systems export combined fields. Split customer names, addresses, or codes into separate columns. Modernize your data structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Parsing log files</h3>
            <p className="text-sm text-muted-foreground">
              Log entries have fixed formats. Split by position to extract timestamp, level, message. Analyze logs in spreadsheet format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing form submissions</h3>
            <p className="text-sm text-muted-foreground">
              Combined form fields need separation. Split "City, State ZIP" into individual columns. Better data organization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning imported contacts</h3>
            <p className="text-sm text-muted-foreground">
              Full names need splitting. Separate first, middle, last names. Enable personalized communications and proper sorting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for import</h3>
            <p className="text-sm text-muted-foreground">
              Target system needs separate fields. Split your combined data before import. Avoid import errors and rework.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing structured text</h3>
            <p className="text-sm text-muted-foreground">
              Any text with consistent structure can be split. Product codes, phone numbers, IDs. Transform text into analyzable data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Delimited works for character separators.</strong>
              Commas, tabs, pipes, any character. Best when data consistently uses the same separator. Most common scenario.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Fixed-width needs consistent positions.</strong>
              Each field starts at specific character position. Common in legacy system exports. Measure positions carefully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First row determines column count.</strong>
              The wizard uses the first row to determine how many columns to create. Ensure first row is representative.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consecutive delimiters create empty columns.</strong>
              Two commas in a row means an empty field. This preserves data alignment. Expected behavior for CSV parsing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex splitting with multiple delimiters or regex patterns, use Excel's Power Query or programming tools. This wizard handles standard delimited and fixed-width data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between delimited and fixed-width?</h3>
            <p className="text-sm text-muted-foreground">
              Delimited splits by separator characters (comma, tab). Fixed-width splits at specific character positions. Choose based on your data format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use multiple delimiters?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses one delimiter at a time. For multiple delimiters, run the tool multiple times or preprocess your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I specify fixed widths?</h3>
            <p className="text-sm text-muted-foreground">
              Enter comma-separated widths like "10,20,30". First column is 10 chars, second is 20 chars, etc. Adjust based on your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle quoted fields?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, standard CSV quoting is respected. Delimiters inside quotes don't trigger splits. Proper CSV parsing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I preview before splitting?</h3>
            <p className="text-sm text-muted-foreground">
              The results appear instantly. Review before downloading. If wrong, adjust settings and try again.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to extra data?</h3>
            <p className="text-sm text-muted-foreground">
              For fixed-width, data beyond specified widths goes to the last column. For delimited, all parts become columns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, processing happens entirely in your browser. No data is uploaded to servers. Safe for sensitive information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
