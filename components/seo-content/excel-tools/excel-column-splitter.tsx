import React from "react"

export default function ExcelColumnSplitterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Column Splitter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. The tool identifies all columns in your data. Select which column you want to split into multiple columns.
          </p>
          <p>
            Choose your split delimiter: space, comma, dash, underscore, or custom character. The tool splits the selected column's values and creates new columns for each part.
          </p>
          <p>
            Results show your data with the split columns expanded. Download as CSV or copy to clipboard. Perfect for separating names, addresses, or combined codes. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Separating first and last names</h3>
            <p className="text-sm text-muted-foreground">
              Imported a full name column? Split by space into first and last names. Essential for personalized communications and sorting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Parsing address fields</h3>
            <p className="text-sm text-muted-foreground">
              Split "123 Main St, City, State" into separate columns. Street, city, state, zip become individual fields. Enables geographic analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Breaking down product codes</h3>
            <p className="text-sm text-muted-foreground">
              SKU "ABC-123-RED" contains category, number, color. Split by dash to analyze each component separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting email domains</h3>
            <p className="text-sm text-muted-foreground">
              Split email by @ symbol. Separate username from domain. Analyze which email providers your users prefer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning imported data</h3>
            <p className="text-sm text-muted-foreground">
              Legacy systems export combined fields. Split them into modern normalized structure. Prepare data for new systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating sortable categories</h3>
            <p className="text-sm text-muted-foreground">
              Combined category strings become separate columns. Sort and filter by individual attributes. Better data organization.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First row determines column count.</strong>
              The tool uses the first data row to determine how many split columns to create. Inconsistent data may cause misalignment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Missing values become empty cells.</strong>
              If a row has fewer parts than expected, empty cells fill the gap. This maintains column alignment across all rows.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Original column is replaced.</strong>
              The split columns replace the original. If you need to keep it, duplicate the column before splitting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">New columns get numbered names.</strong>
              Column_Name_1, Column_Name_2, etc. Rename them in Excel after export for clarity.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex splitting (multiple delimiters, regex patterns), use Excel's Text to Columns wizard or Power Query. This tool handles simple, consistent delimiters.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I split by multiple characters?</h3>
            <p className="text-sm text-muted-foreground">
              Use the custom delimiter option. Enter the exact character sequence. For multiple different delimiters, run the tool multiple times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if some rows have different formats?</h3>
            <p className="text-sm text-muted-foreground">
              Rows with fewer splits get empty cells. Rows with more splits may lose data. Standardize your data first for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I split by fixed width?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses delimiters, not fixed widths. For fixed-width splitting, use Excel's Text to Columns with fixed-width option.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I rename the new columns?</h3>
            <p className="text-sm text-muted-foreground">
              After downloading, open in Excel and rename the headers. Or edit the CSV in a text editor before importing to Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo the split?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Keep your original file as backup. Or use Excel's CONCATENATE to recombine split columns if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle quoted fields?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, CSV parsing respects quoted fields. Delimiters inside quotes don't trigger splits. Standard CSV behavior.
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
