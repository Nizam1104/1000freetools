import CsvToExcel from "@/components/csv-tools/csv-to-excel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Excel Converter - Convert CSV to XLSX with Formatting",
  description:
    "Convert CSV files to Excel .xlsx format with styled headers, auto-fit columns, and custom sheet names. Free online CSV to Excel converter.",
  openGraph: {
    title: "CSV to Excel Converter - Convert CSV to XLSX with Formatting",
    description:
      "Convert CSV files to Excel .xlsx format with styled headers and auto-fit columns.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-excel",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to Excel Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert CSV files to Excel .xlsx format with styled headers, 
            auto-fit columns, and custom sheet names. Download ready-to-share spreadsheets.
          </p>
        </div>

        <CsvToExcel />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV files into proper Excel .xlsx spreadsheets. Unlike simply renaming a file, this creates a genuine Excel workbook with formatted headers, properly sized columns, and full compatibility with Excel, Google Sheets, and LibreOffice Calc.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Excel Formatting Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Header styling:</strong> Headers get a blue background with white bold text for clear visual separation from data rows.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Auto-fit columns:</strong> Column widths automatically adjust to fit the longest value in each column. No more double-clicking to resize.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Custom sheet name:</strong> Name your worksheet instead of the default "Sheet1". Useful for workbooks with multiple sheets.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>UTF-8 support:</strong> Properly handles accented characters, emojis, and non-Latin scripts that often break when opening CSV directly in Excel.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Why Convert to Excel Instead of Opening CSV
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Encoding issues:</strong> Excel on Windows often misreads UTF-8 CSV files, showing garbled accented characters. XLSX format preserves encoding correctly.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Leading zeros:</strong> CSV opens "00123" as 123 in Excel. XLSX preserves the original text format.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Long numbers:</strong> Credit card numbers and IDs over 15 digits get converted to scientific notation in CSV. XLSX keeps them intact as text.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Formulas:</strong> While this tool doesn't add formulas, XLSX format supports them if you add them later. CSV does not.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Professional appearance:</strong> Styled headers and properly sized columns make spreadsheets ready for sharing without manual formatting.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Client deliverables:</strong> Send polished Excel files instead of raw CSV. The formatting shows attention to detail.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Reports and dashboards:</strong> Convert data exports to Excel for stakeholders who prefer spreadsheets over database views.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data sharing:</strong> Excel files open consistently across different systems and Excel versions without encoding issues.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Archive purposes:</strong> XLSX is a stable, well-documented format for long-term data storage.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Email attachments:</strong> Excel files are more universally readable than CSV when sending to external recipients.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Technical Details
          </h2>
          <p className="text-muted-foreground mb-4">
            This tool uses the SheetJS (XLSX) library to generate genuine .xlsx files. The output is an Office Open XML spreadsheet — the same format Excel uses natively.
          </p>
          <p className="text-muted-foreground mb-6">
            All processing happens in your browser. Your CSV never uploads to any server. The generated .xlsx file downloads directly to your computer.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What This Doesn't Do
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>No formulas:</strong> This converter creates static data only. Formulas must be added manually in Excel after conversion.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>No macros:</strong> VBA macros and automation aren't supported. The output is a standard .xlsx file.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>No pivot tables:</strong> Pivot tables, charts, and advanced Excel features require manual setup after conversion.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>No multiple sheets:</strong> Each conversion creates a single-sheet workbook. Merge multiple CSV files first if you need multiple sheets.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>File size:</strong> Works best with files under 50MB or 100,000 rows. Larger files may cause slow performance or browser memory issues.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Column width limits:</strong> Excel has a maximum column width of 255 characters. Extremely long values may not fully auto-fit.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Will this work with Google Sheets?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Google Sheets opens .xlsx files natively. Upload the converted file to Google Drive and open with Sheets.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert multiple CSV files to separate sheets?</h3>
          <p className="text-muted-foreground mb-4">
            This tool creates one sheet per conversion. To create a multi-sheet workbook, use CSV File Merger first, then convert the combined file.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this preserve number formatting?</h3>
          <p className="text-muted-foreground mb-4">
            Numbers convert as values. Currency symbols, percentage signs, and date formats from the CSV display as plain values. Format cells in Excel after opening.
          </p>

          <h3 className="text-xl font-semibold mb-2">What's the difference between .xlsx and .xls?</h3>
          <p className="text-muted-foreground mb-6">
            .xlsx is the modern Excel format (2007+) based on Office Open XML. .xls is the older binary format. This tool creates .xlsx files. For .xls compatibility, open the .xlsx in Excel and save as .xls.
          </p>
        </div>
      </div>
    </>
  );
}
