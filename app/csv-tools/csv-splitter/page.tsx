import CsvSplitter from "@/components/csv-tools/csv-splitter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Splitter - Split Large CSV Files by Row Count, Size, or Column Value",
  description:
    "Split large CSV files into multiple smaller files. Split by row count, file size, or column value groups. Free online CSV splitting tool.",
  openGraph: {
    title: "CSV Splitter - Split Large CSV Files by Row Count, Size, or Column Value",
    description:
      "Split large CSV files into smaller chunks by rows, size, or groups.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-splitter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Splitter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Split large CSV files into multiple smaller files. 
            Split by row count, file size, or group by column values.
          </p>
        </div>

        <CsvSplitter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool splits a large CSV file into multiple smaller CSV files. Choose to split by row count (e.g., 1000 rows per file), by file size (e.g., 5MB per file), or by unique column values (e.g., one file per country). Each output file includes headers.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Split Modes
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>By row count:</strong> Specify how many rows per file. A 10,000 row file split into 1,000 rows creates 10 output files.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>By file size:</strong> Specify maximum file size in KB or MB. The tool calculates how many rows fit within the limit.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>By column value groups:</strong> Each unique value in a column gets its own file. Useful for splitting by category, region, or date.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Headers in each file:</strong> All output files include the header row for standalone usability.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Split by Row Count
          </h2>
          <p className="text-muted-foreground mb-4">Input: 5,000 rows</p>
          <p className="text-muted-foreground mb-4">Split by: 1,000 rows per file</p>
          <p className="text-muted-foreground mb-4">Output files:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`output_part_1.csv - 1,000 rows
output_part_2.csv - 1,000 rows
output_part_3.csv - 1,000 rows
output_part_4.csv - 1,000 rows
output_part_5.csv - 1,000 rows`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Split by Column Value
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,name,country
1,Alice,USA
2,Bob,UK
3,Charlie,USA
4,Diana,Canada
5,Eve,UK`}
          </pre>
          <p className="text-muted-foreground mb-4">Split by: country column</p>
          <p className="text-muted-foreground mb-4">Output files:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`country_USA.csv:
id,name,country
1,Alice,USA
3,Charlie,USA

country_UK.csv:
id,name,country
2,Bob,UK
5,Eve,UK

country_Canada.csv:
id,name,country
4,Diana,Canada`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Email campaign batches:</strong> Split large contact lists into smaller files for email service providers with batch limits.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API upload limits:</strong> Many APIs have file size or row count limits. Split data to fit within constraints.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Parallel processing:</strong> Split data for parallel processing across multiple workers or machines.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Regional distribution:</strong> Split customer data by country or region for local teams.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Manageable chunks:</strong> Break large files into smaller pieces that Excel or other tools can handle.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            File Naming
          </h2>
          <p className="text-muted-foreground mb-4">
            Output files are named automatically:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row count mode:</strong> filename_part_1.csv, filename_part_2.csv, etc.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Size mode:</strong> filename_part_1.csv, filename_part_2.csv, etc.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Column value mode:</strong> filename_value1.csv, filename_value2.csv, etc. (e.g., country_USA.csv)
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Download Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Individual download:</strong> Download each split file separately.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Batch download:</strong> Download all files as a ZIP archive (if supported by your browser).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> While splitting helps manage large files, the input file still loads into browser memory. Files over 200MB may cause issues.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Many output files:</strong> Splitting by column value with many unique values creates many files. 1,000 unique values = 1,000 output files.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size estimation:</strong> Size-based splitting is approximate. Actual file sizes may vary slightly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Do output files include headers?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Every output file includes the header row, making each file independently usable.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I customize the output file names?</h3>
          <p className="text-muted-foreground mb-4">
            This tool uses automatic naming. For custom names, rename files after download or use a script.
          </p>

          <h3 className="text-xl font-semibold mb-2">What happens if the last chunk is smaller?</h3>
          <p className="text-muted-foreground mb-6">
            The last file contains remaining rows. If splitting 5,500 rows into 1,000-row chunks, the last file has 500 rows.
          </p>
        </div>
      </div>
    </>
  );
}
