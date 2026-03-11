import React from "react"

export default function ExcelCompareTwoSheetsSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Compare Two Sheets Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload or paste two CSV files: the original version and the modified version. The tool compares them row by row, identifying what changed between versions.
          </p>
          <p>
            Results are categorized into three groups: Added rows (in modified but not original), Removed rows (in original but not modified), and Modified rows (same key, different values).
          </p>
          <p>
            Each category shows the count and details of changes. Copy the comparison report or download as a text file. Understand exactly what changed between spreadsheet versions. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking data changes over time</h3>
            <p className="text-sm text-muted-foreground">
              Compare monthly reports to see what's new. Identify added customers, removed products, or updated prices. Track business changes systematically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing spreadsheet updates</h3>
            <p className="text-sm text-muted-foreground">
              Someone modified the master file. What changed? Compare before and after to verify updates. Catch accidental modifications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating data migrations</h3>
            <p className="text-sm text-muted-foreground">
              Exported data from old system, imported to new. Compare to ensure nothing was lost. Verify migration accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing team collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Multiple people edit the same file. Compare versions to see each person's contributions. Merge changes intelligently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging data issues</h3>
            <p className="text-sm text-muted-foreground">
              Data was correct yesterday, wrong today. Compare to find what changed. Pinpoint when and what caused the problem.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Compliance and version control</h3>
            <p className="text-sm text-muted-foreground">
              Document what changed between versions. Create audit trails for regulated data. Prove data integrity over time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comparison uses first column as key.</strong>
              Rows are matched by their first column value. Ensure this is a unique identifier like ID or email. Sort both files the same way.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Row order doesn't matter.</strong>
              The tool matches by key value, not position. A row moved to different position isn't flagged as changed. Only content changes matter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Case sensitivity applies.</strong>
              "ABC" and "abc" are different values. Normalize case before comparing if this matters for your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace affects comparison.</strong>
              "John " and "John" are different. Trim your data before comparing. Extra spaces cause false differences.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For cell-by-cell comparison with highlighting, use Excel's built-in Compare Files feature or specialized diff tools. This tool focuses on row-level changes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does it determine what's modified?</h3>
            <p className="text-sm text-muted-foreground">
              Rows with matching first column but different content are modified. The tool shows both old and new values for comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare by multiple columns?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses the first column as key. For composite keys, concatenate columns before comparing, or use a more advanced tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if files have different columns?</h3>
            <p className="text-sm text-muted-foreground">
              Comparison still works but may show many differences. Ensure both files have the same structure for meaningful comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I see which specific cells changed?</h3>
            <p className="text-sm text-muted-foreground">
              Modified rows show the full row content. For cell-level highlighting, use Excel's comparison features or dedicated diff tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How large can files be?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files with thousands of rows work fine. Very large files may need desktop comparison tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save the comparison?</h3>
            <p className="text-sm text-muted-foreground">
              Download the report as a text file. Or copy and paste into a document. Keep records of what changed between versions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, comparison happens entirely in your browser. No data is uploaded to servers. Safe for confidential business data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
