import CsvDelimiterConverter from "@/components/csv-tools/csv-delimiter-converter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Delimiter Converter - Change CSV Delimiter (Comma, Semicolon, Tab, Pipe)",
  description:
    "Convert CSV files between different delimiters: comma, semicolon, tab, pipe, or custom. Free online CSV delimiter conversion tool.",
  openGraph: {
    title: "CSV Delimiter Converter - Change CSV Delimiter",
    description:
      "Convert CSV files between comma, semicolon, tab, pipe, and custom delimiters.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-delimiter-converter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Delimiter Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Change the delimiter in CSV files. Convert between comma, 
            semicolon, tab, pipe, or any custom character.
          </p>
        </div>

        <CsvDelimiterConverter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool changes the delimiter character in your CSV file. Upload a file with one delimiter and convert it to use a different delimiter. The tool properly handles quoted fields, ensuring delimiters inside quoted values aren't mistakenly replaced.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Common Delimiters
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Comma (,):</strong> Standard CSV format. Used in US, UK, and many other regions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Semicolon (;):</strong> Common in European countries where comma is the decimal separator (e.g., 1,50 instead of 1.50).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Tab (\t):</strong> Creates TSV (tab-separated values) format. Useful when data contains commas.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Pipe (|):</strong> Used when data may contain commas, semicolons, and tabs. Common in database exports.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Custom:</strong> Any single character you specify. Useful for legacy system compatibility.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (comma-delimited):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,amount
Alice,alice@example.com,100.50
Bob,bob@example.com,200.75`}
          </pre>
          <p className="text-muted-foreground mb-4">Convert to semicolon delimiter:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name;email;amount
Alice;alice@example.com;100.50
Bob;bob@example.com;200.75`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>European system compatibility:</strong> Convert comma-delimited files to semicolon for European software that expects it.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports:</strong> Some databases prefer pipe-delimited or tab-delimited imports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Legacy system integration:</strong> Older systems may require specific delimiters.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data with embedded commas:</strong> Convert to tab or pipe delimiter when your data contains many commas (addresses, descriptions).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Excel compatibility:</strong> Excel's import behavior varies by region. Convert to the delimiter your Excel expects.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Handling Quoted Fields
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool correctly handles quoted fields:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Input (comma-delimited with quoted field):</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,address,city
"Alice, Jr.","123 Main St, Apt 4",New York`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Output (semicolon-delimited):</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name;address;city
"Alice, Jr.";"123 Main St, Apt 4";New York`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Commas inside quoted fields are preserved. Only the field-separating commas are replaced.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Delimiter Selection by Region
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>US, UK, Australia:</strong> Comma delimiter, period for decimals.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Germany, France, Spain, Italy:</strong> Semicolon delimiter, comma for decimals.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Brazil:</strong> Semicolon delimiter, comma for decimals.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Technical/data systems:</strong> Tab or pipe delimiters are common regardless of region.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Auto-Detection
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool can auto-detect the input delimiter by analyzing the file:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Consistent column counts:</strong> The correct delimiter produces consistent column counts across rows.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Common delimiters checked:</strong> Comma, semicolon, tab, pipe are tested.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Manual override:</strong> If auto-detection fails, manually specify the input delimiter.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Single character delimiters:</strong> This tool supports single-character delimiters only. Multi-character delimiters aren't supported.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Malformed CSV:</strong> Files with inconsistent quoting or embedded newlines may not convert correctly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Why does Excel open my CSV incorrectly?</h3>
          <p className="text-muted-foreground mb-4">
            Excel uses your system's regional settings to determine the expected delimiter. In Europe, Excel expects semicolons. Convert to semicolon or change Excel's import settings.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert from tab-delimited to comma-delimited?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Select tab as the input delimiter and comma as the output delimiter.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if my data contains the target delimiter?</h3>
          <p className="text-muted-foreground mb-6">
            Fields containing the target delimiter are automatically quoted. For example, converting to comma will quote any field containing a comma.
          </p>
        </div>
      </div>
    </>
  );
}
