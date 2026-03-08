import CsvRowFilter from "@/components/csv-tools/csv-row-filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Row Filter - Filter CSV Rows by Conditions (Equals, Contains, Regex)",
  description:
    "Filter CSV rows using conditions like equals, contains, starts with, regex, greater than, less than. Multiple conditions with AND/OR logic. Free online CSV filtering tool.",
  openGraph: {
    title: "CSV Row Filter - Filter CSV Rows by Conditions",
    description:
      "Filter CSV rows using multiple conditions with AND/OR logic.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-row-filter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvRowFilter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool filters CSV rows based on conditions you define. Select a column, choose an operator (equals, contains, greater than, etc.), and specify the value to match. Add multiple conditions with AND/OR logic to create complex filters. Only rows matching all conditions are included in the output.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Filter Operators
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Text operators:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Equals — Exact match (case-sensitive or insensitive)</li>
            <li>Contains — Value appears anywhere in the cell</li>
            <li>Starts with — Value at the beginning</li>
            <li>Ends with — Value at the end</li>
            <li>Regex — Pattern matching with regular expressions</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Numeric operators:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Greater than (&gt;)</li>
            <li>Less than (&lt;)</li>
            <li>Greater than or equal (&gt;=)</li>
            <li>Less than or equal (&lt;=)</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Empty checks:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Is empty — Cell is blank or null</li>
            <li>Is not empty — Cell has any value</li>
          </ul>
          <p className="text-muted-foreground mb-6">
            <strong>Logic:</strong> Combine multiple conditions with AND (all must match) or OR (any can match).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Filter by Status
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,name,status,amount
1,Alice,active,100
2,Bob,inactive,50
3,Charlie,active,200
4,Diana,pending,75`}
          </pre>
          <p className="text-muted-foreground mb-4">Filter: status equals "active"</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,name,status,amount
1,Alice,active,100
3,Charlie,active,200`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Filter by Numeric Range
          </h2>
          <p className="text-muted-foreground mb-4">Filter: amount &gt;= 100 AND amount &lt;= 200</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,name,status,amount
1,Alice,active,100
3,Charlie,active,200`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Filter with Regex
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`email,department
john@example.com,Engineering
jane@test.com,Marketing
bob@example.com,Engineering`}
          </pre>
          <p className="text-muted-foreground mb-4">Filter: email matches regex ".*@example\.com"</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`email,department
john@example.com,Engineering
bob@example.com,Engineering`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data subsetting:</strong> Extract only rows matching specific criteria for analysis or reporting.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Error detection:</strong> Find rows with empty required fields, invalid formats, or out-of-range values.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Segment creation:</strong> Create customer segments like "active users with purchases over $100".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data cleaning:</strong> Identify rows to remove or fix based on quality rules.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Test data generation:</strong> Filter production data to create focused test datasets.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Regex Filter Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Basic patterns:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`^test.*      - Starts with "test"
.*@gmail\.com  - Gmail addresses
\d{3}-\d{4}    - Phone format 123-4567
^[A-Z]+$       - All uppercase letters`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Case insensitive:</strong> Enable the case-insensitive flag for patterns that should match regardless of case.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Special characters:</strong> Escape dots, parentheses, and other regex metacharacters with backslash.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow filtering.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Complex regex:</strong> Very complex regular expressions may cause performance issues.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I filter on multiple columns?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Add multiple conditions, each targeting different columns. Combine with AND or OR logic.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does filtering modify the original data?</h3>
          <p className="text-muted-foreground mb-4">
            No. The output is a new CSV with only matching rows. Original data is unchanged.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I save my filter for reuse?</h3>
          <p className="text-muted-foreground mb-6">
            This tool doesn't save filter configurations. For repeated filtering, consider writing a script.
          </p>
        </div>
      </div>
    </>
  );
}
