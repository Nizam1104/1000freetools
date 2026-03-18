import React from "react"

export default function ExcelRemoveBlankRowsSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Removing Blank Rows from Excel Spreadsheets</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The blank row remover scans your Excel or CSV file and deletes rows where all cells are empty. It also offers options to remove rows where specific columns are blank, or rows that contain only whitespace.
          </p>
          <p>
            The tool processes files entirely in your browser—no upload to servers. It parses the spreadsheet, identifies blank rows based on your criteria, filters them out, and generates a clean file for download.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Blank row detection options:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Completely empty</strong> - All cells in the row are blank</li>
              <li><strong className="text-foreground">Key column empty</strong> - Specific required columns have no value</li>
              <li><strong className="text-foreground">Whitespace only</strong> - Cells contain spaces/tabs but no actual content</li>
              <li><strong className="text-foreground">Formula results</strong> - Include/exclude rows where formulas return empty strings</li>
            </ul>
          </div>
          <p>
            A preview shows how many rows will be removed before you download. You can verify the detection is working correctly and adjust criteria if needed.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning exported data</h3>
            <p className="text-sm text-muted-foreground">
              Your accounting software exports reports with blank rows between sections. Remove them to create a clean dataset for analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for import</h3>
            <p className="text-sm text-muted-foreground">
              Importing to a CRM? Blank rows cause errors. Clean the file first to ensure every row has valid data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing copy-paste artifacts</h3>
            <p className="text-sm text-muted-foreground">
              Pasted data from web pages often includes extra blank rows. Remove them in one click instead of manually deleting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Consolidating multiple sheets</h3>
            <p className="text-sm text-muted-foreground">
              Combined data from multiple sources has gaps where each file ended. Remove blank rows to create a continuous dataset.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing file size</h3>
            <p className="text-sm text-muted-foreground">
              Spreadsheets with thousands of blank rows are bloated. Removing them shrinks file size and speeds up calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating clean reports</h3>
            <p className="text-sm text-muted-foreground">
              Printing a spreadsheet? Blank rows waste pages. Remove them for a professional, compact report.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formulas returning empty strings aren't blank.</strong>
              A cell with <code className="font-mono text-xs">=IF(A1&gt;0,"","")</code> looks empty but contains a formula. The tool can optionally treat these as blank or preserve them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Headers are preserved.</strong>
              The first row is treated as a header and never removed, even if some header cells are blank.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Row numbers change after removal.</strong>
              If you have formulas referencing specific row numbers, they may break after blank rows are removed. Review formulas after cleaning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace-only cells count as blank.</strong>
              Cells containing only spaces or tabs are treated as empty. This catches accidental whitespace from copy-paste operations.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Download the cleaned file with a new name (e.g., <code className="font-mono text-xs">data-cleaned.xlsx</code>). Keep the original in case you need to recover accidentally removed rows.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I remove rows where only some columns are blank?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, specify which columns are required. Rows missing values in those columns are removed, even if other columns have data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with merged cells?</h3>
            <p className="text-sm text-muted-foreground">
              Merged cells complicate blank detection. The tool treats a merged cell as blank if the top-left cell (the anchor) is empty. Consider unmerging before cleaning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I remove blank columns instead of rows?</h3>
            <p className="text-sm text-muted-foreground">
              This tool removes rows. For columns, transpose your data (copy → paste special → transpose), remove blank rows, then transpose back.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo the removal?</h3>
            <p className="text-sm text-muted-foreground">
              Not after downloading. The cleaned file doesn't contain the removed rows. Always keep a backup of the original file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about hidden rows?</h3>
            <p className="text-sm text-muted-foreground">
              Hidden rows are processed the same as visible rows. If they're blank, they're removed. Unhide rows first if you want to preserve them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does formatting get preserved?</h3>
            <p className="text-sm text-muted-foreground">
              Cell formatting (colors, borders, number formats) is preserved for remaining rows. Removed rows' formatting is obviously lost.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
