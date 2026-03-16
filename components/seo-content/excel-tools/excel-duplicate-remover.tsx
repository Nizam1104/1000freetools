import React from "react"

export default function ExcelDuplicateRemoverSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Duplicate Remover Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. The tool identifies the columns in your data. Select which columns to check for duplicates - you can check one column or multiple.
          </p>
          <p>
            Choose your action: remove duplicates entirely (keeping first occurrence) or just highlight them for review. The tool compares rows based on your selected columns.
          </p>
          <p>
            Results show the cleaned data with duplicates removed or marked. Download as CSV or copy to clipboard. Statistics show how many duplicates were found. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning customer databases</h3>
            <p className="text-sm text-muted-foreground">
              Imported contacts from multiple sources? Remove duplicate entries based on email or phone. Keep your CRM clean and accurate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing email lists</h3>
            <p className="text-sm text-muted-foreground">
              Don't send duplicates to the same person. Remove duplicate emails before your campaign. Save money and avoid annoying subscribers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Consolidating survey responses</h3>
            <p className="text-sm text-muted-foreground">
              Some people submitted multiple responses. Identify and remove duplicates based on email or ID. Get accurate response counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging data from multiple sources</h3>
            <p className="text-sm text-muted-foreground">
              Combined spreadsheets from different teams? Duplicates are inevitable. Clean them up before analysis or reporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing data quality</h3>
            <p className="text-sm text-muted-foreground">
              Highlight duplicates first to review before deleting. Understand the extent of duplication. Make informed cleanup decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing product catalogs</h3>
            <p className="text-sm text-muted-foreground">
              SKU or product code should be unique. Find and remove duplicate product entries. Ensure clean inventory data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First occurrence is always kept.</strong>
              When removing duplicates, the first row is preserved. Later duplicates are deleted. Sort your data first if order matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Column selection affects results.</strong>
              Checking only email vs checking email+name gives different results. More columns = stricter duplicate detection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity may matter.</strong>
              "John@example.com" and "john@example.com" may be treated as different. Normalize case before deduplication if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace causes false uniques.</strong>
              "John " and "John" look the same but aren't. Trim your data first. Extra spaces create false non-duplicates.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always highlight duplicates first before removing. Review what will be deleted. Export a backup before making permanent changes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it keep the first or last duplicate?</h3>
            <p className="text-sm text-muted-foreground">
              It keeps the first occurrence. Rows are processed top to bottom. First unique combination is preserved, subsequent duplicates removed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I check multiple columns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, select any combination of columns. A row is duplicate only if all selected columns match. Useful for compound keys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to empty cells?</h3>
            <p className="text-sm text-muted-foreground">
              Empty cells are treated as equal. Two rows with blank values in checked columns are considered duplicates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo the removal?</h3>
            <p className="text-sm text-muted-foreground">
              Not in this tool. Download the original file as backup. Or use highlight mode first to review before removing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser limits apply. Files with thousands of rows work fine. Very large files may slow down. Consider desktop tools for massive datasets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is highlight different from remove?</h3>
            <p className="text-sm text-muted-foreground">
              Highlight marks duplicates with *** markers but keeps all rows. Remove deletes duplicate rows entirely. Use highlight to review first.
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
