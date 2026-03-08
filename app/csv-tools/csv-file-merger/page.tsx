import CsvFileMerger from "@/components/csv-tools/csv-file-merger";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV File Merger - Combine Multiple CSV Files with Column Alignment",
  description:
    "Merge multiple CSV files into one. Union (all columns), intersection (common columns), or first file schema. Free online CSV file merging tool.",
  openGraph: {
    title: "CSV File Merger - Combine Multiple CSV Files with Column Alignment",
    description:
      "Combine multiple CSV files into one with flexible column alignment.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-file-merger",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvFileMerger />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool merges multiple CSV files into one combined file. Upload files in any order, choose how to handle mismatched columns, and get a single merged CSV. Files are stacked vertically (rows appended), with columns aligned by header name.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Merge Strategies
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Union (all columns):</strong> Include every column from every file. If a file doesn't have a column, those cells are empty.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Intersection (common columns):</strong> Include only columns that exist in ALL files. Columns unique to some files are excluded.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>First file schema:</strong> Use only the columns from the first file. Additional columns in other files are ignored.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Source file column:</strong> Optionally add a column indicating which file each row came from.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Union Merge
          </h2>
          <p className="text-muted-foreground mb-4">File 1 (sales_q1.csv):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`region,revenue,profit
North,10000,2000
South,15000,3000`}
          </pre>
          <p className="text-muted-foreground mb-4">File 2 (sales_q2.csv):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`region,revenue,expenses
East,12000,8000
West,18000,12000`}
          </pre>
          <p className="text-muted-foreground mb-4">Union merge (all columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`region,revenue,profit,expenses
North,10000,2000,
South,15000,3000,
East,12000,,8000
West,18000,,12000`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Intersection Merge
          </h2>
          <p className="text-muted-foreground mb-4">Same files, intersection merge:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`region,revenue
North,10000
South,15000
East,12000
West,18000`}
          </pre>
          <p className="text-muted-foreground mb-6">Only columns present in BOTH files are included.</p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Monthly report consolidation:</strong> Combine monthly CSV exports into a single annual file.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Regional data aggregation:</strong> Merge data from different regional offices into a central file.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Batch processing results:</strong> Combine output files from parallel processing jobs.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Survey response compilation:</strong> Merge survey results from multiple forms or time periods.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Log file aggregation:</strong> Combine log exports from multiple servers or applications.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Column Alignment
          </h2>
          <p className="text-muted-foreground mb-4">
            Columns are matched by header name, not position:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Same name, different position:</strong> Columns are aligned correctly regardless of order.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Case sensitivity:</strong> "Name" and "name" are treated as different columns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Whitespace:</strong> "Name" and "Name " (with trailing space) are different columns. Clean headers first if needed.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Source File Tracking
          </h2>
          <p className="text-muted-foreground mb-4">
            Enable the "add source file column" option to track where each row came from:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`source_file,region,revenue
sales_q1.csv,North,10000
sales_q1.csv,South,15000
sales_q2.csv,East,12000
sales_q2.csv,West,18000`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Useful for auditing, debugging, or filtering by source later.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            File Order
          </h2>
          <p className="text-muted-foreground mb-4">
            Files are processed in the order you upload them. Rows from the first file appear first, then the second file, etc.
          </p>
          <p className="text-muted-foreground mb-6">
            Reorder files before merging if the sequence matters for your use case.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Memory:</strong> All files load into browser memory. Total size should be under 100MB for best performance.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Many files:</strong> Merging dozens of files may be slow. Consider batch merging in groups.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Encoding:</strong> All files should use the same encoding (UTF-8 recommended). Mixed encodings may cause character issues.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if files have different column orders?</h3>
          <p className="text-muted-foreground mb-4">
            Columns are aligned by name, not position. Different orders are handled correctly.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I merge files with completely different columns?</h3>
          <p className="text-muted-foreground mb-4">
            Yes, using union mode. The result will have all columns from all files, with empty cells where data doesn't exist.
          </p>

          <h3 className="text-xl font-semibold mb-2">How many files can I merge?</h3>
          <p className="text-muted-foreground mb-6">
            There's no hard limit, but performance depends on total file size and count. For 100+ files, consider scripting the merge.
          </p>
        </div>
      </div>
    </>
  );
}
