import React from "react"

export default function ExcelSortDataToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sorting Excel Data Without Formulas</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The Excel sort tool organizes spreadsheet data by any column—alphabetically, numerically, by date, or by custom order. Unlike Excel's built-in sort, this tool shows a preview before applying changes and handles edge cases like mixed data types.
          </p>
          <p>
            Upload your CSV or Excel file, select the column to sort by, choose ascending or descending order, and download the sorted result. The tool preserves all formatting, formulas, and cell relationships.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Sort options available:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">A to Z / Z to A</strong> - Alphabetical sorting for text</li>
              <li><strong className="text-foreground">Smallest to Largest</strong> - Numerical sorting for numbers</li>
              <li><strong className="text-foreground">Oldest to Newest</strong> - Chronological sorting for dates</li>
              <li><strong className="text-foreground">Custom list</strong> - Sort by predefined order (e.g., priority levels)</li>
              <li><strong className="text-foreground">By color</strong> - Group cells by fill or font color</li>
            </ul>
          </div>
          <p>
            Multi-level sorting lets you sort by multiple columns: first by department, then by salary within each department. The tool applies sorts in order, creating hierarchical organization.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing reports for presentation</h3>
            <p className="text-sm text-muted-foreground">
              Your sales data needs to be sorted by region, then by rep name. Sort before creating pivot tables or charts for the quarterly meeting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding duplicates or outliers</h3>
            <p className="text-sm text-muted-foreground">
              Sort by amount to spot unusually large transactions. Sort by date to find gaps in records. Sorting reveals patterns hidden in random order.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning imported data</h3>
            <p className="text-sm text-muted-foreground">
              Data exported from your CRM is in random order. Sort by customer ID to group related records, making it easier to spot inconsistencies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating ranked lists</h3>
            <p className="text-sm text-muted-foreground">
              Sort products by revenue to create a top-10 list. Sort employees by performance score for bonus calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Organizing contact lists</h3>
            <p className="text-sm text-muted-foreground">
              Sort customers by last name for a printed directory. Sort by city for regional mail campaigns. Sort by signup date for anniversary emails.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for mail merge</h3>
            <p className="text-sm text-muted-foreground">
              Your mail merge needs sorted data to print letters in a specific order. Sort by ZIP code for bulk mailing discounts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Headers stay in place.</strong>
              The tool recognizes the first row as headers and keeps it at the top. Only data rows are sorted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mixed data types sort as text.</strong>
              If a column contains both numbers and text, everything sorts alphabetically. "100" comes before "20" in text sort. Clean your data first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Blank cells sort to the end.</strong>
              Empty cells appear at the bottom regardless of sort direction. This helps you spot incomplete records.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formulas move with their rows.</strong>
              When row 5 swaps with row 10, all cells in those rows move together. Formulas maintain their relative references.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Warning:</strong> Always backup before sorting. If you sort the wrong column or direction, undo may not recover the original order. Keep an unsorted copy.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort by multiple columns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use multi-level sort. Sort by primary column first, then apply secondary sort within those groups. The tool maintains the hierarchy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does sorting affect formulas?</h3>
            <p className="text-sm text-muted-foreground">
              Formulas move with their rows, so relative references stay correct. However, absolute references (<code className="font-mono text-xs">$A$1</code>) point to the same cell regardless of sorting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I sort by last name when names are in one column?</h3>
            <p className="text-sm text-muted-foreground">
              Split the column first (Data → Text to Columns in Excel), sort by the last name column, then recombine if needed. Or use a helper column with a formula to extract last names.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort by cell color?</h3>
            <p className="text-sm text-muted-foreground">
              Excel supports color sorting, but this web tool sorts by cell values only. For color-based sorting, use Excel's built-in sort feature.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the largest file I can sort?</h3>
            <p className="text-sm text-muted-foreground">
              Browser-based tools handle files up to ~10MB or 100,000 rows. Larger files should be sorted in Excel desktop, which has more memory available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I sort filtered data?</h3>
            <p className="text-sm text-muted-foreground">
              Sorting filtered data only sorts visible rows. Hidden rows stay in place. This tool sorts all data—apply filters after sorting if needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
