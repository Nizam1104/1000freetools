import CsvColumnStatistics from "@/components/csv-tools/csv-column-statistics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Column Statistics - Calculate Descriptive Statistics for CSV Columns",
  description:
    "Calculate descriptive statistics for CSV columns: count, unique, null rate, min, max, mean, median, mode, and frequency distribution. Free online CSV statistics tool.",
  openGraph: {
    title: "CSV Column Statistics - Calculate Descriptive Statistics for CSV Columns",
    description:
      "Calculate comprehensive statistics for CSV columns.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-statistics",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Column Statistics
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Calculate descriptive statistics for every column in your CSV. 
            Get count, unique values, null rate, min, max, mean, median, mode, and frequency distribution.
          </p>
        </div>

        <CsvColumnStatistics />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool analyzes each column in your CSV file and calculates comprehensive statistics. For numeric columns, you get min, max, mean, median, and mode. For all columns, you get count, unique values, null rate, and frequency distribution. Export the statistics as CSV for reporting or further analysis.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Statistics Provided
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Basic stats (all columns):</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Count — Total number of rows</li>
            <li>Null count — Number of empty/null values</li>
            <li>Null rate — Percentage of null values</li>
            <li>Unique count — Number of distinct values</li>
            <li>Unique rate — Percentage of unique values</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Numeric stats (numeric columns):</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Min — Minimum value</li>
            <li>Max — Maximum value</li>
            <li>Mean — Average value</li>
            <li>Median — Middle value (50th percentile)</li>
            <li>Mode — Most frequent value</li>
          </ul>
          <p className="text-muted-foreground mb-6">
            <strong>Frequency distribution:</strong> Top N most common values with their counts and percentages.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Statistics
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,age,salary,department
Alice,30,50000,Engineering
Bob,25,45000,Marketing
Charlie,35,60000,Engineering
Diana,,55000,Sales
Eve,28,52000,Marketing`}
          </pre>
          <p className="text-muted-foreground mb-4">Statistics output:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Column: name
  Count: 5, Nulls: 0 (0%), Unique: 5 (100%)
  Top values: Alice(1), Bob(1), Charlie(1)...

Column: age
  Count: 5, Nulls: 1 (20%), Unique: 4 (80%)
  Min: 25, Max: 35, Mean: 29.5, Median: 29, Mode: N/A

Column: salary
  Count: 5, Nulls: 0 (0%), Unique: 5 (100%)
  Min: 45000, Max: 60000, Mean: 52400, Median: 52000

Column: department
  Count: 5, Nulls: 0 (0%), Unique: 3 (60%)
  Top values: Engineering(2, 40%), Marketing(2, 40%), Sales(1, 20%)`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data exploration:</strong> Quickly understand the distribution and quality of a new dataset.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data quality assessment:</strong> Identify columns with high null rates or data quality issues.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Feature analysis:</strong> Understand numeric feature distributions before machine learning.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Outlier detection:</strong> Min/max values help identify potential outliers.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Documentation:</strong> Include statistics in data dictionaries and documentation.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Understanding Statistics
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Mean vs Median:</strong> Mean is the average. Median is the middle value. Median is less affected by outliers.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Salaries: [30k, 35k, 40k, 45k, 500k]
Mean: 130k (skewed by 500k)
Median: 40k (more representative)`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Null rate:</strong> High null rates (>50%) may indicate columns that aren't being used or data collection issues.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Unique rate:</strong> 100% unique suggests an ID column. Low unique rate suggests a categorical column.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Mode:</strong> The most common value. Useful for understanding dominant categories.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequency Distribution
          </h2>
          <p className="text-muted-foreground mb-4">
            Shows the most common values in each column:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Column: status
  Top 5 values:
  - Active: 450 (75%)
  - Inactive: 100 (17%)
  - Pending: 30 (5%)
  - Suspended: 15 (2.5%)
  - Archived: 5 (0.5%)`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Helps identify dominant categories and rare values.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Numeric Detection
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool automatically detects numeric columns:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Integers:</strong> Whole numbers like 42, -17, 0.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Decimals:</strong> Numbers with decimal points like 3.14, -0.5.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Currency:</strong> Numbers with currency symbols like $100, €50.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Non-numeric:</strong> Text, dates, and mixed values get basic stats only (count, nulls, unique).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Export Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Download as CSV:</strong> Export statistics for use in reports or further analysis.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Copy to clipboard:</strong> Quick copy for pasting into documentation.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Frequency export:</strong> Optionally include full frequency distributions in the export.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow analysis.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Advanced statistics:</strong> Doesn't calculate standard deviation, variance, percentiles beyond median, or correlations.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Date handling:</strong> Dates are treated as text. Date-specific statistics (min/max date) aren't calculated.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What counts as a null value?</h3>
          <p className="text-muted-foreground mb-4">
            Empty cells, cells with only whitespace, and explicit "null" or "NULL" text are counted as null.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I get statistics for specific columns only?</h3>
          <p className="text-muted-foreground mb-4">
            This tool analyzes all columns. For specific columns, extract them first using CSV Column Extractor.
          </p>

          <h3 className="text-xl font-semibold mb-2">How is the median calculated?</h3>
          <p className="text-muted-foreground mb-6">
            For odd row counts, the median is the middle value. For even counts, it's the average of the two middle values.
          </p>
        </div>
      </div>
    </>
  );
}
