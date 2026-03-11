import React from "react"

export default function ExcelMergeCellsToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Merge Cells Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. The tool combines all columns into a single merged column. Choose your separator: space, comma, dash, new line, or custom character.
          </p>
          <p>
            Each row's values are concatenated with your chosen separator. Empty cells are skipped to avoid extra separators. The result is a clean, merged single-column output.
          </p>
          <p>
            Download as CSV or copy to clipboard. Perfect for creating full names, addresses, or combined identifiers. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating full names</h3>
            <p className="text-sm text-muted-foreground">
              Combine first, middle, last name columns. Single column for display or export. Essential for mailing lists and reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building complete addresses</h3>
            <p className="text-sm text-muted-foreground">
              Merge street, city, state, zip into one field. Single-line addresses for labels. Simplified shipping data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating unique identifiers</h3>
            <p className="text-sm text-muted-foreground">
              Combine multiple fields for unique keys. Department + EmployeeID. Prefix + Number. Custom ID generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for import</h3>
            <p className="text-sm text-muted-foreground">
              Target system needs combined fields. Merge before import. Match the required format exactly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating display names</h3>
            <p className="text-sm text-muted-foreground">
              Combine name + title, product + model. User-friendly display values. Better readability in reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating searchable text</h3>
            <p className="text-sm text-muted-foreground">
              Merge multiple fields for full-text search. All data in one searchable column. Improved search functionality.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">All columns are merged together.</strong>
              The tool combines every column in each row. Can't select specific columns. Pre-process if you need selective merging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Empty cells are skipped.</strong>
              No extra separators for blank values. "John" + "" + "Doe" becomes "John Doe", not "John  Doe". Clean output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is single column.</strong>
              All data goes into one "Merged" column. Original structure is lost. Keep original file as backup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">New line separator creates multi-line cells.</strong>
              In Excel, enable text wrapping to see all lines. Useful for formatted addresses. May need cell formatting adjustment.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> In Excel, use CONCATENATE or & operator for selective merging. =A2&" "&B2 gives more control. This tool is for merging all columns quickly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I merge only specific columns?</h3>
            <p className="text-sm text-muted-foreground">
              This tool merges all columns. For selective merging, delete unwanted columns first or use Excel formulas after export.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What separator should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Space for names. Comma for lists. New line for addresses. Dash for codes. Choose based on your output needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I unmerge the data later?</h3>
            <p className="text-sm text-muted-foreground">
              Not automatically. Keep your original file. Or use Text to Columns in Excel if you used a consistent separator.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are numbers handled?</h3>
            <p className="text-sm text-muted-foreground">
              Numbers are converted to text. 123 becomes "123". Merged as text strings. No mathematical operations after merging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about dates?</h3>
            <p className="text-sm text-muted-foreground">
              Dates become text strings. Format depends on your CSV. May need reformatting in Excel after merging.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add custom text between values?</h3>
            <p className="text-sm text-muted-foreground">
              Use the custom separator option. Enter any text as separator. Limited to one separator for all columns.
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
