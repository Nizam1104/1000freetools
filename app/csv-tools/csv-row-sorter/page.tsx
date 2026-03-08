import CsvRowSorter from "@/components/csv-tools/csv-row-sorter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Row Sorter - Sort CSV by Multiple Columns with Custom Order",
  description:
    "Sort CSV rows by one or more columns. Ascending or descending order. Text, number, or date sorting. Free online CSV sorting tool.",
  openGraph: {
    title: "CSV Row Sorter - Sort CSV by Multiple Columns with Custom Order",
    description:
      "Sort CSV rows by single or multiple columns in ascending or descending order.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-row-sorter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Row Sorter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Sort CSV rows by one or more columns. Choose ascending or descending 
            order for each column. Supports text, numeric, and date sorting.
          </p>
        </div>

        <CsvRowSorter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool sorts CSV rows based on column values. Select one or more columns to sort by, choose ascending or descending order for each, and pick the sort type (text, number, or date). Multi-level sorting lets you sort by primary, secondary, and tertiary columns.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Sort Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Single column sort:</strong> Sort by one column in ascending (A-Z, 0-9) or descending (Z-A, 9-0) order.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Multi-level sort:</strong> Sort by primary column, then by secondary column for ties, then tertiary for remaining ties.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Sort types:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Text — Alphabetical sorting (case-insensitive)</li>
            <li>Number — Numeric sorting (handles decimals and negatives)</li>
            <li>Date — Date sorting (recognizes common date formats)</li>
          </ul>
          <p className="text-muted-foreground mb-6">
            <strong>Reorder levels:</strong> Drag sort levels to change priority order.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Single Column Sort
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (unsorted):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,age,salary
Charlie,35,60000
Alice,30,75000
Bob,25,50000`}
          </pre>
          <p className="text-muted-foreground mb-4">Sort by name ascending (A-Z)</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,age,salary
Alice,30,75000
Bob,25,50000
Charlie,35,60000`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Multi-Level Sort
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`department,name,salary
Engineering,Charlie,60000
Engineering,Alice,75000
Marketing,Bob,50000
Marketing,Diana,55000`}
          </pre>
          <p className="text-muted-foreground mb-4">Sort by department (A-Z), then by salary (high to low)</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`department,name,salary
Engineering,Alice,75000
Engineering,Charlie,60000
Marketing,Diana,55000
Marketing,Bob,50000`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Numeric Sort
          </h2>
          <p className="text-muted-foreground mb-4">Sort by salary descending (numeric)</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,age,salary
Alice,30,75000
Charlie,35,60000
Bob,25,50000`}
          </pre>
          <p className="text-muted-foreground mb-4">Note: Numeric sort correctly orders 75000 &gt; 60000 &gt; 50000. Text sort would incorrectly order them as 50000 &gt; 60000 &gt; 75000 (comparing first digits).</p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Report preparation:</strong> Sort data by date, amount, or name for presentation-ready reports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Ranking analysis:</strong> Sort by numeric columns to identify top/bottom performers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Grouping:</strong> Sort by category column to group related rows together.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Chronological ordering:</strong> Sort by date columns to see events in timeline order.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data review:</strong> Sort to quickly spot outliers, duplicates, or data quality issues.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Sort Type Selection
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Use text sort for:</strong> Names, categories, IDs, any non-numeric data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Use number sort for:</strong> Prices, quantities, scores, measurements, any numeric data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Use date sort for:</strong> Dates in formats like YYYY-MM-DD, MM/DD/YYYY, DD-MM-YYYY.
          </p>
          <p className="text-muted-foreground mb-6">
            Choosing the wrong sort type gives incorrect results. Numbers sorted as text compare character-by-character ("10" &lt; "2" because "1" &lt; "2").
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Handling Empty Values
          </h2>
          <p className="text-muted-foreground mb-4">
            Empty cells in the sort column are handled consistently:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Ascending sort:</strong> Empty values appear first.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Descending sort:</strong> Empty values appear last.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow sorting.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Date recognition:</strong> Only common date formats are auto-detected. Unusual formats may sort as text.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I sort by more than 3 columns?</h3>
          <p className="text-muted-foreground mb-4">
            This tool supports up to 3 sort levels. For more complex sorting, use a spreadsheet or scripting language.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does sorting preserve the original row order for ties?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. The sort is stable — rows with equal values maintain their relative order from the input.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I reverse the sort order?</h3>
          <p className="text-muted-foreground mb-6">
            Yes. Toggle between ascending and descending for each sort level independently.
          </p>
        </div>
      </div>
    </>
  );
}
