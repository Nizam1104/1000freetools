import CSVEditor from "@/components/csv-tools/csv-editor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Editor Online - Edit CSV Files Like a Spreadsheet",
  description:
    "Free online CSV editor with spreadsheet-like interface. Edit cells, add/delete rows and columns, sort data, and export changes. All processing happens in your browser.",
  openGraph: {
    title: "CSV Editor Online - Edit CSV Files Like a Spreadsheet",
    description:
      "Free online CSV editor with spreadsheet-like interface. Edit cells, add/delete rows and columns, sort data, and export changes.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-editor",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CSVEditor />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This CSV Editor Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This is a full-featured CSV editor that runs entirely in your browser. You get a spreadsheet-like grid where you can click any cell to edit it, add new rows or columns, delete unwanted data, and rearrange your structure. Changes track in an undo/redo history, so you can step backward if needed.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How to Edit Your CSV File
          </h2>
          <p className="text-muted-foreground mb-4">
            Upload a CSV file or paste your data. Click any cell to edit its value — press Enter to save or Escape to cancel. Right-click row numbers or column headers for bulk operations like inserting, deleting, or duplicating.
          </p>
          <p className="text-muted-foreground mb-6">
            Use the toolbar to add rows above or below your selection, insert columns to the left or right, or sort by any column. When you're done, export as CSV with or without headers.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Who Uses This Tool
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data analysts</strong> fix typos in exported datasets, remove test rows, or rename columns before importing into Python or R.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Marketing teams</strong> clean email lists, update customer information, or merge data from multiple sources without opening Excel.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Developers</strong> edit configuration files, update test data, or fix malformed CSV exports from databases.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Small business owners</strong> manage product catalogs, update inventory spreadsheets, or prepare data for bulk imports into e-commerce platforms.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Key Features
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Inline cell editing</strong> — Click any cell, type your value, press Enter to save. Edits highlight with a colored border.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row and column management</strong> — Add, delete, duplicate, or reorder rows and columns. Multi-select support for bulk operations.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Sorting</strong> — Sort by any column in ascending or descending order. Handles text, numbers, and dates.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Undo/redo history</strong> — Every change tracks in history. Step backward or forward through your edits.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Copy as CSV or JSON</strong> — Select rows and copy them as CSV format or JSON objects for pasting into code.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>File size:</strong> Works best with files under 50MB or 100,000 rows. Larger files may cause slow performance depending on your browser's memory.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Formulas:</strong> This editor handles plain CSV data only. No formula support like Excel — values are stored as-is.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Formatting:</strong> Cell colors, fonts, and number formatting don't carry over from Excel. CSV is plain text only.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I edit large CSV files?</h3>
          <p className="text-muted-foreground mb-4">
            Yes, but performance depends on your device. Files with 10,000-50,000 rows work smoothly. Beyond that, editing may feel sluggish as your browser renders the grid.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this keep my data private?</h3>
          <p className="text-muted-foreground mb-4">
            All editing happens in your browser. Your CSV never uploads to any server. Close the tab and your data is gone.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I undo changes?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Every edit — cell changes, row additions, deletions — tracks in undo/redo history. Use Ctrl+Z or the undo button to step backward.
          </p>

          <h3 className="text-xl font-semibold mb-2">What happens to formulas from Excel?</h3>
          <p className="text-muted-foreground mb-4">
            CSV files don't store formulas. If you export from Excel, formulas become their calculated values. This editor shows and edits those values only.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I add images or formatting?</h3>
          <p className="text-muted-foreground mb-6">
            No. CSV is plain text format. This editor handles text and numbers only — no cell colors, fonts, borders, or embedded images.
          </p>
        </div>
      </div>
    </>
  );
}
