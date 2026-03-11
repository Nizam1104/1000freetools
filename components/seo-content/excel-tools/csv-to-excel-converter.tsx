import React from "react"

export default function CsvToExcelConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the CSV to Excel Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV file or paste the data directly. Select the delimiter that matches your file: comma, tab, or semicolon. The converter parses your data and structures it properly.
          </p>
          <p>
            Enter a sheet name for your Excel file. The converter generates SpreadsheetML format - an XML-based Excel file that opens in any spreadsheet application.
          </p>
          <p>
            Download the converted .xls file or copy the XML. The file opens directly in Excel, Google Sheets, or LibreOffice. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing data with Excel users</h3>
            <p className="text-sm text-muted-foreground">
              CSV is plain text. Excel files look more professional. Convert before sending to clients or colleagues who expect spreadsheets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Importing to other systems</h3>
            <p className="text-sm text-muted-foreground">
              Some systems only accept Excel files. Convert your CSV export to the required format. Avoid manual re-entry.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding formatting later</h3>
            <p className="text-sm text-muted-foreground">
              Excel files support formatting, formulas, and multiple sheets. Start with CSV conversion, then enhance in Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preserving data types</h3>
            <p className="text-sm text-muted-foreground">
              Excel can interpret data types better than CSV. Dates, numbers, and text are handled appropriately on import.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating templates</h3>
            <p className="text-sm text-muted-foreground">
              Convert CSV data to Excel, then save as template. Reuse the structure for ongoing data entry and reporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving data</h3>
            <p className="text-sm text-muted-foreground">
              Excel files are more self-documenting than CSV. Sheet names, headers, and structure provide context for future users.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Output is XML-based Excel format.</strong>
              The .xls file uses SpreadsheetML. It opens in modern Excel versions. Some very old Excel versions may not support it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Delimiter must match your data.</strong>
              Comma-delimited needs comma selected. Tab-separated needs tab. Wrong delimiter scrambles your columns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First row becomes headers.</strong>
              The converter treats the first line as column headers. If your CSV has no headers, add a dummy first row.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are escaped.</strong>
              Ampersands, less-than, and quotes are XML-escaped. Your data is preserved correctly in the output file.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For .xlsx format (modern Excel), use a dedicated conversion tool or open the CSV directly in Excel and Save As .xlsx. This tool creates compatible .xls format.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between CSV and Excel?</h3>
            <p className="text-sm text-muted-foreground">
              CSV is plain text with comma-separated values. Excel is a binary or XML format supporting multiple sheets, formulas, formatting, and more.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple sheets?</h3>
            <p className="text-sm text-muted-foreground">
              This tool creates single-sheet files. For multiple sheets, convert each CSV separately and combine in Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve formulas?</h3>
            <p className="text-sm text-muted-foreground">
              CSV doesn't contain formulas, only values. The Excel file will have the calculated values, not the formulas that produced them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files with thousands of rows work fine. Very large files may need desktop conversion tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I specify data types?</h3>
            <p className="text-sm text-muted-foreground">
              This tool treats all data as text. Excel will interpret types on open. For specific types, format after opening in Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, conversion happens entirely in your browser. No data is uploaded to servers. Safe for sensitive business data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on Mac?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the generated Excel file works on Mac, Windows, and Linux. Any spreadsheet application that reads .xls will work.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
