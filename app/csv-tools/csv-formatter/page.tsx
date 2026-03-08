import CsvFormatter from "@/components/csv-tools/csv-formatter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Formatter - Standardize Delimiters, Quoting & Line Endings",
  description:
    "Format CSV files with consistent delimiters, proper quoting, normalized line endings, and UTF-8 encoding. RFC 4180 compliant CSV formatting.",
  openGraph: {
    title: "CSV Formatter - Standardize Delimiters, Quoting & Line Endings",
    description:
      "Format CSV files with consistent delimiters, proper quoting, normalized line endings, and UTF-8 encoding.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-formatter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Formatter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Standardize CSV formatting with consistent delimiters, proper quoting, 
            normalized line endings, and UTF-8 encoding. RFC 4180 compliant output.
          </p>
        </div>

        <CsvFormatter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This CSV Formatter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool takes messy, inconsistent CSV files and produces clean, standardized output. It fixes quoting issues, normalizes line endings, trims unwanted whitespace, and ensures proper encoding. Choose your delimiter, line ending style, and encoding options.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Formatting Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Delimiter:</strong> Switch between comma, semicolon, pipe, or tab. Useful when your target system expects a specific separator.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Line endings:</strong> Choose LF (Unix/macOS) or CRLF (Windows). Mixed line endings cause parsing failures in some tools.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Encoding:</strong> UTF-8 or UTF-8 with BOM. Excel on Windows requires BOM to display accented characters correctly.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Trim whitespace:</strong> Remove leading and trailing spaces from all fields. Cleans up data exported from poorly formatted systems.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Quoting:</strong> Applies RFC 4180 rules — fields with commas, quotes, or newlines get quoted. Internal quotes are doubled for escaping.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When You Need This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports failing:</strong> MySQL and PostgreSQL are picky about line endings and quoting. Format your CSV to match their expectations.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Excel encoding issues:</strong> Accented characters showing as garbled? Excel on Windows needs UTF-8 with BOM.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Cross-platform sharing:</strong> Files created on Mac use LF, Windows uses CRLF. Normalize so everyone's tools can read the file.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>European CSV formats:</strong> Many European systems expect semicolon delimiters instead of commas. Convert without manual editing.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>API data imports:</strong> Services like Shopify, Stripe, or Google Ads have specific CSV format requirements. Format to match their specs.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            RFC 4180 Compliance
          </h2>
          <p className="text-muted-foreground mb-4">
            This formatter follows RFC 4180, the standard for CSV format:
          </p>
          <p className="text-muted-foreground mb-4">
            Fields containing commas, double quotes, or newlines are wrapped in double quotes. Double quotes inside fields are escaped by doubling them (" becomes ""). Each record is on a separate line with consistent line endings.
          </p>
          <p className="text-muted-foreground mb-6">
            This ensures compatibility with Excel, Google Sheets, database import tools, and programming language CSV parsers.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Common Formatting Problems Fixed
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Inconsistent quoting:</strong> Some fields quoted, others not. This tool applies consistent rules throughout.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Whitespace issues:</strong> Leading spaces from fixed-width exports or trailing spaces from copy-paste get trimmed.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Mixed line endings:</strong> Files edited on multiple systems have both CRLF and LF. Normalized to your choice.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Wrong delimiter:</strong> Semicolon CSV from European system needs to be comma-delimited for your US-based tool.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            UTF-8 with BOM vs Without
          </h2>
          <p className="text-muted-foreground mb-4">
            BOM (Byte Order Mark) is a special character at the start of a file that signals UTF-8 encoding.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Use BOM for:</strong> Excel on Windows, older Windows tools that don't auto-detect UTF-8.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Skip BOM for:</strong> Web applications, Unix/Linux systems, programming language parsers, modern tools that detect encoding automatically.
          </p>
          <p className="text-muted-foreground mb-6">
            Without BOM, Excel may display accented characters as garbled text. With BOM, some web parsers may treat the first column name as "ï»¿ColumnName".
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Doesn't fix structural errors:</strong> If your CSV has wrong column counts or embedded newlines in wrong places, formatting won't fix that. Use CSV Validator first.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Character encoding:</strong> This tool outputs UTF-8 only. It doesn't convert from other encodings like Latin-1 or Windows-1252.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What's the difference between LF and CRLF?</h3>
          <p className="text-muted-foreground mb-4">
            LF (Line Feed, \n) is used by Unix, macOS, and Linux. CRLF (Carriage Return + Line Feed, \r\n) is used by Windows. Mixed line endings cause CSV parsers to miscount rows or fail entirely.
          </p>

          <h3 className="text-xl font-semibold mb-2">Why does Excel need UTF-8 with BOM?</h3>
          <p className="text-muted-foreground mb-4">
            Excel on Windows assumes files are in your system's default encoding (often Windows-1252). The BOM signals that the file is UTF-8, so accented characters and emojis display correctly.
          </p>

          <h3 className="text-xl font-semibold mb-2">When should I use semicolon instead of comma?</h3>
          <p className="text-muted-foreground mb-4">
            In European countries where comma is the decimal separator (1,50 instead of 1.50), semicolon is the standard CSV delimiter to avoid confusion.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this remove empty rows?</h3>
          <p className="text-muted-foreground mb-4">
            No. This formatter standardizes structure and encoding but doesn't remove content. Use CSV Cleaner or CSV Minifier to strip blank rows.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this handle large files?</h3>
          <p className="text-muted-foreground mb-6">
            Files up to 100MB work well in most browsers. Larger files depend on available memory. The entire file processes in your browser, so very large files may be slow.
          </p>
        </div>
      </div>
    </>
  );
}
