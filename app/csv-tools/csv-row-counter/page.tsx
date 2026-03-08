import CsvRowCounter from "@/components/csv-tools/csv-row-counter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Row Counter - Count Rows, Blanks, and Column Fill Rate Statistics",
  description:
    "Count total rows, blank rows, and calculate per-column fill rate statistics in CSV files. Free online CSV row counting and analysis tool.",
  openGraph: {
    title: "CSV Row Counter - Count Rows, Blanks, and Column Fill Rate Statistics",
    description:
      "Count CSV rows and analyze column fill rates and data completeness.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-row-counter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Row Counter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Count rows in CSV files and analyze data completeness. 
            Get statistics on blank rows, column fill rates, and data distribution.
          </p>
        </div>

        <CsvRowCounter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool analyzes your CSV file and provides row count statistics. It counts total rows, identifies blank or empty rows, and calculates per-column fill rates (percentage of non-empty values). Use it to assess data quality and completeness before processing or importing.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Statistics Provided
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Total rows:</strong> Count of all data rows (excluding header).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Blank rows:</strong> Rows where all columns are empty. Often artifacts from copy-paste or export errors.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Per-column fill rate:</strong> For each column, the percentage of rows with non-empty values.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Null count per column:</strong> Number of empty cells in each column.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Unique count:</strong> Number of distinct values in each column.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Exportable report:</strong> Download statistics as CSV for further analysis or documentation.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Output
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,phone,department
Alice,alice@example.com,555-0100,Engineering
Bob,bob@example.com,,Marketing
Charlie,,,Sales

Diana,diana@example.com,555-0103,HR`}
          </pre>
          <p className="text-muted-foreground mb-4">Statistics:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Total rows: 5
Blank rows: 1

Column Statistics:
name       - 80% fill (4/5), 1 null
email      - 60% fill (3/5), 2 nulls
phone      - 40% fill (2/5), 3 nulls
department - 80% fill (4/5), 1 null`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data quality assessment:</strong> Before importing data, check how complete each column is.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Identify problematic columns:</strong> Columns with low fill rates may indicate export issues or optional fields.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Find blank rows:</strong> Detect empty rows that could cause import errors or skew analysis.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Dataset documentation:</strong> Include fill rate statistics in data dictionaries or documentation.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Migration planning:</strong> Understand data completeness before migrating to a new system with required fields.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Understanding Fill Rate
          </h2>
          <p className="text-muted-foreground mb-4">
            Fill rate is the percentage of rows with non-empty values in a column:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>100% fill:</strong> Every row has a value. Ideal for required fields.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>80-99% fill:</strong> Mostly complete. Some missing values may be acceptable.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>50-79% fill:</strong> Moderate completeness. Investigate why values are missing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Below 50% fill:</strong> Sparse data. Column may be mostly unused or poorly populated.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>0% fill:</strong> Completely empty column. Consider removing it.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Counts as Empty
          </h2>
          <p className="text-muted-foreground mb-4">
            The following are considered empty/null:
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Completely blank cells</li>
            <li>Cells with only whitespace</li>
            <li>Explicit "null" or "NULL" text (optional)</li>
            <li>Empty quoted strings ("")</li>
          </ul>
          <p className="text-muted-foreground mb-6">
            Zero (0) is NOT empty — it's a valid numeric value.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>CRM data audit:</strong> A sales team exports their contacts and discovers phone numbers are only 30% complete. They launch a data enrichment project.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>E-commerce product audit:</strong> An online retailer finds that 40% of products are missing descriptions. They prioritize filling this gap.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Survey response analysis:</strong> A researcher checks response rates per question to identify which questions were skipped most often.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow analysis.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Deep analysis:</strong> This tool provides basic statistics. For advanced analytics (mean, median, distributions), use CSV Column Statistics.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does the header row count as a row?</h3>
          <p className="text-muted-foreground mb-4">
            No. Row counts exclude the header row. Only data rows are counted.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I export the statistics?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Download the statistics as a CSV file for use in reports or further analysis.
          </p>

          <h3 className="text-xl font-semibold mb-2">How are blank rows different from null values?</h3>
          <p className="text-muted-foreground mb-6">
            Blank rows have ALL columns empty. Null values are empty cells within otherwise populated rows. Blank rows are often errors; null values may be legitimate missing data.
          </p>
        </div>
      </div>
    </>
  );
}
