import CsvQuoteEscaper from "@/components/csv-tools/csv-quote-escaper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Quote Escaper - Apply RFC 4180 Compliant Quoting to CSV Fields",
  description:
    "Apply proper quoting to CSV fields according to RFC 4180 standards. Quote all fields or only when necessary. Free online CSV quote escaping tool.",
  openGraph: {
    title: "CSV Quote Escaper - Apply RFC 4180 Compliant Quoting to CSV Fields",
    description:
      "Apply proper RFC 4180 quoting to CSV fields for maximum compatibility.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-quote-escaper",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Quote Escaper
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Apply proper quoting to CSV fields according to RFC 4180 standards. 
            Quote fields containing special characters or quote all fields.
          </p>
        </div>

        <CsvQuoteEscaper />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool applies proper quoting to CSV fields according to RFC 4180, the standard for CSV format. Fields containing commas, double quotes, or newlines are wrapped in double quotes. Internal quotes are escaped by doubling them. Choose between minimal quoting (only when necessary) or quoting all fields.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            RFC 4180 Quoting Rules
          </h2>
          <p className="text-muted-foreground mb-4">
            According to the CSV standard (RFC 4180):
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fields with commas:</strong> Must be quoted. "New York, NY" not New York, NY.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fields with double quotes:</strong> Must be quoted, with internal quotes doubled. "He said ""Hello""" not He said "Hello".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fields with newlines:</strong> Must be quoted to contain embedded line breaks.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Fields without special characters:</strong> Quoting is optional. Both John and "John" are valid.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Quoting Modes
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>RFC 4180 (minimal):</strong> Quote only fields that require it (contain comma, quote, or newline). Produces cleaner output.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Quote all fields:</strong> Wrap every field in quotes. Maximum compatibility with strict parsers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Quote numeric fields:</strong> Optionally quote numeric values to preserve leading zeros and prevent type conversion.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Quote mode:</strong> Choose when to apply quoting based on your needs.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: RFC 4180 Mode
          </h2>
          <p className="text-muted-foreground mb-4">Input (inconsistent quoting):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,address,quote
Alice,New York NY,Hello
Bob,"Los Angeles, CA",He said "Hi"
Charlie,Chicago,Normal text`}
          </pre>
          <p className="text-muted-foreground mb-4">Output (RFC 4180 compliant):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,address,quote
Alice,New York NY,Hello
Bob,"Los Angeles, CA","He said ""Hi"""
Charlie,Chicago,Normal text`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Quote All Mode
          </h2>
          <p className="text-muted-foreground mb-4">Same input, quote all mode:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`"name","address","quote"
"Alice","New York NY","Hello"
"Bob","Los Angeles, CA","He said ""Hi"""
"Charlie","Chicago","Normal text"}`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Fix malformed CSV:</strong> Repair CSV files with missing or inconsistent quoting.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Prepare for strict parsers:</strong> Some systems require RFC 4180 compliant input.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Standardize exports:</strong> Ensure consistent quoting across CSV files from different sources.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Preserve numeric formatting:</strong> Quote numeric fields to preserve leading zeros (e.g., "00123" vs 123).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Database imports:</strong> Many database import tools expect properly quoted CSV.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Quote Escaping
          </h2>
          <p className="text-muted-foreground mb-4">
            Double quotes inside fields are escaped by doubling:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Input:  He said "Hello"
Output: "He said ""Hello"""`}
          </pre>
          <p className="text-muted-foreground mb-6">
            This is the standard CSV escaping mechanism, compatible with all RFC 4180 parsers.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Why Quote Numeric Fields
          </h2>
          <p className="text-muted-foreground mb-4">
            Unquoted numeric values may be interpreted differently by various tools:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Leading zeros:</strong> 00123 becomes 123 without quotes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Long numbers:</strong> Credit card numbers over 15 digits may be converted to scientific notation.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Phone numbers:</strong> Values like 555-0100 may be interpreted as formulas or dates.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Malformed input:</strong> Severely malformed CSV (unclosed quotes, inconsistent structure) may not process correctly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What's the difference between RFC 4180 and Quote All?</h3>
          <p className="text-muted-foreground mb-4">
            RFC 4180 quotes only when necessary (cleaner output). Quote All quotes every field (maximum compatibility, larger file size).
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this fix unescaped quotes?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Quotes inside fields are properly escaped by doubling them.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this remove quotes instead of adding them?</h3>
          <p className="text-muted-foreground mb-6">
            No. This tool adds/normalizes quotes. To remove unnecessary quotes, use the CSV Unquote tool.
          </p>
        </div>
      </div>
    </>
  );
}
