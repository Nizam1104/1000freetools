import ExcelToCsv from "@/components/csv-tools/excel-to-csv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel to CSV Converter - Convert XLSX/XLS to CSV Format",
  description:
    "Convert Excel .xlsx and .xls files to CSV. Extract sheets from workbooks and export as comma-separated values. Free online Excel to CSV converter.",
  openGraph: {
    title: "Excel to CSV Converter - Convert XLSX/XLS to CSV Format",
    description:
      "Convert Excel .xlsx and .xls files to CSV. Extract sheets from workbooks.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/excel-to-csv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <ExcelToCsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool extracts data from Excel workbooks and converts it to plain CSV format. It reads both modern .xlsx files and older .xls format, then outputs comma-separated values ready for database imports, API uploads, or any system that requires CSV input.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Conversion Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Delimiter selection:</strong> Choose comma, semicolon, pipe, or tab as the output delimiter. Semicolon is standard in European systems where comma is the decimal separator.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Sheet extraction:</strong> By default, extracts the first sheet in the workbook. Multi-sheet workbooks require separate conversions for each sheet.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>UTF-8 output:</strong> All output is UTF-8 encoded, preserving accented characters, emojis, and non-Latin scripts.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports:</strong> MySQL, PostgreSQL, and BigQuery accept CSV for bulk imports. Convert Excel data exports before importing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API data uploads:</strong> Services like Shopify, Stripe, Google Ads, and Facebook Ads require CSV for bulk product, customer, or campaign uploads.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data pipelines:</strong> Convert manually maintained Excel sheets to CSV for automated processing in Python, Node.js, or ETL tools.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Version control:</strong> CSV files work better in Git than binary Excel files. Convert for tracking changes in repositories.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>System migrations:</strong> Export legacy Excel data to CSV for import into new systems that don't support Excel format.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Gets Converted
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Cell values:</strong> Text, numbers, dates, and boolean values convert directly to CSV fields.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Formulas:</strong> Formulas convert to their calculated values. The formula itself (=SUM(A1:A10)) doesn't transfer — only the result appears in CSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Formatting:</strong> Cell colors, fonts, borders, and number formats don't transfer. CSV is plain text only.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Multiple sheets:</strong> Only the first sheet extracts by default. Convert each sheet separately if you need all of them.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Doesn't Transfer
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Formulas:</strong> Only calculated values transfer. If you need formulas, keep the original Excel file.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Charts and images:</strong> Embedded charts, logos, and images don't appear in CSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Cell formatting:</strong> Bold, italic, colors, conditional formatting — none of this survives the conversion.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Hidden rows/columns:</strong> All visible and hidden cells export. CSV has no concept of hidden data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Macros and VBA:</strong> Automation code doesn't transfer. CSV is data only.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Handling Special Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Dates:</strong> Excel dates convert to their display format (e.g., "2024-01-15"). The underlying serial number doesn't appear.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Leading zeros:</strong> Values like "00123" export as-is if formatted as text in Excel. Numeric formatting may drop leading zeros.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Long numbers:</strong> Credit card numbers and IDs over 15 digits export correctly if the cell is formatted as text in Excel.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Special characters:</strong> Commas, quotes, and newlines within cells are properly escaped with quoting per RFC 4180.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Single sheet per conversion:</strong> Multi-sheet workbooks require separate conversions. Extract each sheet individually.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>File size:</strong> Works best with files under 50MB. Large Excel files with complex formulas or many sheets may be slow to process.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Encrypted files:</strong> Password-protected Excel files can't be converted. Remove protection before uploading.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I convert all sheets at once?</h3>
          <p className="text-muted-foreground mb-4">
            This tool extracts one sheet per conversion. For multiple sheets, convert each separately or use a script to automate the process.
          </p>

          <h3 className="text-xl font-semibold mb-2">Will formulas be preserved?</h3>
          <p className="text-muted-foreground mb-4">
            No. CSV stores values only. Formulas like =A1+B1 convert to their calculated result. The formula itself is lost.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this work with .xls (older Excel format)?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Both .xlsx (Excel 2007+) and .xls (Excel 97-2003) formats are supported.
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I handle Excel files with merged cells?</h3>
          <p className="text-muted-foreground mb-6">
            Merged cells export as a single value in the first cell of the merged range. Other cells in the range appear empty in the CSV.
          </p>
        </div>
      </div>
    </>
  );
}
