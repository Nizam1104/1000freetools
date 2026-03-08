import CsvCleaner from "@/components/csv-tools/csv-cleaner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Cleaner - Fix Common CSV Issues (Whitespace, Blank Rows, Encoding, BOM)",
  description:
    "Automatically fix common CSV problems: trim whitespace, remove blank rows, strip BOM, normalize line endings. Free online CSV cleaning tool.",
  openGraph: {
    title: "CSV Cleaner - Fix Common CSV Issues",
    description:
      "Automatically clean and fix common CSV problems.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-cleaner",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Cleaner
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Automatically fix common CSV issues. Trim whitespace, remove blank 
            rows, strip BOM markers, and normalize line endings.
          </p>
        </div>

        <CsvCleaner />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool automatically fixes common CSV problems that cause import failures and data quality issues. Select which cleaning operations to apply, and get a clean, standardized CSV file. A change report shows exactly what was fixed.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Cleaning Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Trim whitespace:</strong> Remove leading and trailing spaces from all fields. "  John  " becomes "John".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Remove blank rows:</strong> Delete rows where all columns are empty. Common artifact from copy-paste or export errors.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Remove BOM:</strong> Strip the Byte Order Mark from the start of files. Prevents "ï»¿ColumnName" header issues.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Normalize line endings:</strong> Convert all line endings to LF (Unix style). Fixes mixed CRLF/LF issues.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Change report:</strong> See exactly what was cleaned: rows removed, BOM stripped, whitespace trimmed.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Common CSV Problems Fixed
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Leading/trailing spaces:</strong> From fixed-width exports, manual editing, or copy-paste.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Before: "  Alice  ", " 30 ", " New York "
After:  "Alice", "30", "New York"`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Blank rows at end:</strong> Excel and other tools often add trailing blank rows.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Before: 105 rows (100 data + 5 blank)
After:  100 rows`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>BOM markers:</strong> Windows Excel adds BOM that breaks some parsers.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Before: ï»¿name,email
After:  name,email`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Mixed line endings:</strong> Files edited on multiple systems have both CRLF and LF.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Cleaning Report
          </h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Cleaning Report:
- BOM removed: Yes
- Blank rows removed: 3
- Fields trimmed: 47
- Line endings normalized: CRLF → LF

Original size: 15.2 KB
Cleaned size: 14.1 KB`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Before database imports:</strong> Clean data to avoid import errors from whitespace or blank rows.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>After Excel exports:</strong> Excel often adds BOM and trailing blank rows.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Before data analysis:</strong> Whitespace causes grouping and matching issues in analysis tools.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API data preparation:</strong> Clean data before uploading to web services with strict validation.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data quality improvement:</strong> Fix common issues that accumulate from multiple edits and exports.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Is BOM?
          </h2>
          <p className="text-muted-foreground mb-4">
            BOM (Byte Order Mark) is a special character (U+FEFF) that some programs add at the start of UTF-8 files:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Added by:</strong> Windows Excel, Notepad, some Windows applications.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Problem:</strong> Parsers read it as part of the first column header, creating "ï»¿name" instead of "name".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fix:</strong> Remove BOM for compatibility with Unix tools, web applications, and most parsers.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Keep BOM if:</strong> You need the file to open correctly in Excel on Windows with accented characters.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Line Ending Types
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>CRLF (\r\n):</strong> Windows standard.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>LF (\n):</strong> Unix, macOS, Linux standard.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>CR (\r):</strong> Old Mac (pre-OS X). Rare today.
          </p>
          <p className="text-muted-foreground mb-6">
            Mixed line endings cause parsers to miscount rows. Normalizing to LF ensures cross-platform compatibility.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Complex issues:</strong> Doesn't fix structural problems like wrong column counts or encoding corruption.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Encoding:</strong> Assumes UTF-8 input. Other encodings may need conversion first.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Will this change my data values?</h3>
          <p className="text-muted-foreground mb-4">
            Only whitespace at the start/end of fields is removed. Internal spaces and actual data values are unchanged.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I preview changes before saving?</h3>
          <p className="text-muted-foreground mb-4">
            The change report shows what was cleaned. Review it before downloading the cleaned file.
          </p>

          <h3 className="text-xl font-semibold mb-2">Should I remove BOM for Excel?</h3>
          <p className="text-muted-foreground mb-6">
            If the file is for Excel on Windows, keep BOM for proper accented character display. For web applications and databases, remove BOM.
          </p>
        </div>
      </div>
    </>
  );
}
