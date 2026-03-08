import CsvDataNormalizer from "@/components/csv-tools/csv-data-normalizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Data Normalizer - Standardize Dates, Phones, Currencies, and More",
  description:
    "Normalize CSV data values: standardize date formats, phone numbers, currencies, casing, country codes, and booleans. Free online CSV data normalization tool.",
  openGraph: {
    title: "CSV Data Normalizer - Standardize Dates, Phones, Currencies, and More",
    description:
      "Standardize and normalize CSV data values for consistency.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-data-normalizer",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Data Normalizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Standardize data values in CSV files. Normalize dates, phone numbers, 
            currencies, text casing, country codes, and boolean values.
          </p>
        </div>

        <CsvDataNormalizer />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool normalizes data values in your CSV file to consistent formats. Select columns and choose normalization rules for dates, phone numbers, currencies, text casing, country codes, and boolean values. Transform messy, inconsistent data into clean, standardized formats.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Normalization Types
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Dates:</strong> Convert various date formats to a standard format (YYYY-MM-DD, MM/DD/YYYY, DD-MM-YYYY, etc.).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Phone numbers:</strong> Format to international (+1-555-123-4567), national ((555) 123-4567), or digits-only (15551234567).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Currencies:</strong> Standardize currency symbols, decimal places, and thousand separators.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Casing:</strong> Convert text to uppercase, lowercase, title case, or sentence case.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Country codes:</strong> Convert between alpha-2 (US), alpha-3 (USA), numeric (840), or full names (United States).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Booleans:</strong> Normalize true/false, yes/no, 1/0, Y/N to a consistent format.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Date Normalization
          </h2>
          <p className="text-muted-foreground mb-4">Input (mixed formats):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,birth_date
Alice,01/15/1990
Bob,1985-03-22
Charlie,22.07.1988
Diana,July 4, 1992`}
          </pre>
          <p className="text-muted-foreground mb-4">Normalize to YYYY-MM-DD:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,birth_date
Alice,1990-01-15
Bob,1985-03-22
Charlie,1988-07-22
Diana,1992-07-04`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Phone Normalization
          </h2>
          <p className="text-muted-foreground mb-4">Input (mixed formats):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,phone
Alice,5551234567
Bob,(555) 123-4567
Charlie,555.123.4567
Diana,+1 555 123 4567`}
          </pre>
          <p className="text-muted-foreground mb-4">Normalize to international format:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,phone
Alice,+1-555-123-4567
Bob,+1-555-123-4567
Charlie,+1-555-123-4567
Diana,+1-555-123-4567`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Casing Normalization
          </h2>
          <p className="text-muted-foreground mb-4">Input (inconsistent casing):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,city
alice smith,NEW YORK
BOB JONES,los angeles
Charlie Brown,CHICAGO`}
          </pre>
          <p className="text-muted-foreground mb-4">Normalize names to Title Case, cities to uppercase:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,city
Alice Smith,NEW YORK
Bob Jones,LOS ANGELES
Charlie Brown,CHICAGO`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data consolidation:</strong> Merge data from multiple sources with different formatting conventions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database preparation:</strong> Standardize data before import to ensure consistent storage.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API integration:</strong> Format data to match API expectations for dates, phones, etc.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Report generation:</strong> Create consistently formatted reports for stakeholders.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data quality improvement:</strong> Fix inconsistencies that cause grouping, sorting, and matching issues.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Date Format Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>YYYY-MM-DD:</strong> ISO 8601 standard. Best for sorting and international use.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>MM/DD/YYYY:</strong> US format.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>DD-MM-YYYY:</strong> European format.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>DD/MM/YYYY:</strong> UK/international format.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>YYYY/MM/DD:</strong> Alternative ISO format, common in Asia.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Phone Format Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>International:</strong> +1-555-123-4567. Best for global datasets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>National:</strong> (555) 123-4567. Best for single-country datasets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Digits only:</strong> 15551234567. Best for storage and comparison.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Dashed:</strong> 555-123-4567. Common US format.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Dotted:</strong> 555.123.4567. Alternative format.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Date parsing:</strong> Ambiguous dates (01/02/2024 could be Jan 2 or Feb 1) may parse incorrectly.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Phone validation:</strong> This tool formats phones but doesn't validate if they're real numbers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Complex patterns:</strong> Custom data patterns require scripting for normalization.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if my dates are ambiguous?</h3>
          <p className="text-muted-foreground mb-4">
            Dates like 01/02/2024 are ambiguous (US: Jan 2, EU: Feb 1). The tool tries to infer from context, but manual review may be needed.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I normalize multiple columns at once?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Select multiple columns and apply the same or different normalization rules to each.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this validate data?</h3>
          <p className="text-muted-foreground mb-6">
            This tool formats data but doesn't validate correctness. Invalid dates or phone numbers may produce unexpected output.
          </p>
        </div>
      </div>
    </>
  );
}
