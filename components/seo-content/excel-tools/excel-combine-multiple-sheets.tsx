import React from "react"

export default function ExcelCombineMultipleSheetsSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Combining Multiple Excel Sheets into One</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The sheet combiner merges data from multiple worksheets within a workbook, or from multiple separate Excel files, into a single consolidated sheet. It stacks rows from each source while preserving column alignment.
          </p>
          <p>
            The tool matches columns by header name. If Sheet1 has "Name, Email, Phone" and Sheet2 has "Name, Email, Phone", rows combine seamlessly. If columns differ, the tool creates a union of all columns and leaves blanks where data doesn't exist.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Combination options:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Add source indicator</strong> - Include a column showing which sheet/file each row came from</li>
              <li><strong className="text-foreground">Skip headers</strong> - Only the first sheet's headers are kept; subsequent sheets' headers are treated as data</li>
              <li><strong className="text-foreground">Remove duplicates</strong> - Eliminate rows that are identical across all columns</li>
              <li><strong className="text-foreground">Sort combined data</strong> - Order the final result by a specific column</li>
            </ul>
          </div>
          <p>
            Output is a single Excel file with one consolidated sheet, ready for pivot tables, analysis, or reporting.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Consolidating monthly reports</h3>
            <p className="text-sm text-muted-foreground">
              Each regional office submits a monthly Excel file. Combine all 12 months into one master sheet for annual analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging survey responses</h3>
            <p className="text-sm text-muted-foreground">
              Survey data is split across sheets by question type. Combine into one sheet to analyze correlations between responses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating master contact lists</h3>
            <p className="text-sm text-muted-foreground">
              Sales team has separate sheets for leads, customers, and partners. Combine for a complete contact database.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Aggregating test results</h3>
            <p className="text-sm text-muted-foreground">
              Student scores are in separate sheets by class period. Combine to calculate school-wide statistics and rankings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for pivot tables</h3>
            <p className="text-sm text-muted-foreground">
              Pivot tables work best with flat data. Combine multiple sheets into one tall table for easier pivot analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving historical data</h3>
            <p className="text-sm text-muted-foreground">
              Each year's data is in a separate sheet. Combine into an archive sheet for long-term storage and trend analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Column matching is by header name.</strong>
              "Customer" and "Customer Name" are different columns. Standardize headers before combining, or expect separate columns in the output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data types should match.</strong>
              If Column A is dates in Sheet1 but text in Sheet2, the combined column may have inconsistent types. Clean data before combining.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formulas may break.</strong>
              Formulas referencing other sheets will have broken references after combining. Convert formulas to values before combining if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Row order is preserved.</strong>
              Sheets are combined in the order you select. Sheet1 rows come first, then Sheet2, etc. Sort the final result if you need different ordering.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always add a "Source" column when combining. It lets you trace any row back to its origin sheet, which is invaluable for debugging data issues.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine sheets with different columns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the tool creates a union of all columns. Rows get blanks for columns that don't exist in their source sheet.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I remove duplicates from combined data?</h3>
            <p className="text-sm text-muted-foreground">
              Enable the "Remove duplicates" option. The tool compares all columns and keeps only unique rows. Or use Excel's Remove Duplicates feature after combining.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine files from different formats?</h3>
            <p className="text-sm text-muted-foreground">
              This tool combines Excel sheets. For CSV files, import them into Excel first, then combine. Or use a dedicated CSV combiner tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum number of sheets I can combine?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Typically 20-50 sheets or up to 100,000 total rows. For larger datasets, use Power Query or database tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does formatting get preserved?</h3>
            <p className="text-sm text-muted-foreground">
              Cell formatting (colors, fonts) from the first sheet is applied to the combined data. Other sheets' formatting is typically lost in the merge.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine sheets from different workbooks?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, upload multiple Excel files. The tool extracts data from each file's sheets and combines them all into one output.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
