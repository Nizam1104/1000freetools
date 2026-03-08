import CsvColumnExtractor from "@/components/csv-tools/csv-column-extractor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Column Extractor - Extract Specific Columns from CSV by Name or Index",
  description:
    "Extract selected columns from CSV files. Choose columns by name or index, reorder them, and rename headers. Free online CSV column extraction tool.",
  openGraph: {
    title: "CSV Column Extractor - Extract Specific Columns from CSV by Name or Index",
    description:
      "Extract and reorder specific columns from CSV files.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-extractor",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Column Extractor
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Extract specific columns from CSV files by name or index. 
            Reorder columns and rename headers in the output.
          </p>
        </div>

        <CsvColumnExtractor />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool extracts selected columns from your CSV file and creates a new CSV with only those columns. Choose columns by checking boxes next to their names, or specify column indices. Reorder columns by dragging or specifying the order. Optionally rename column headers in the output.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Selection Methods
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>By name:</strong> Check boxes next to column names to select them. Visual and intuitive for files with meaningful headers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>By index:</strong> Specify column positions (0-based or 1-based). Useful when you know exact positions or headers are missing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Reordering:</strong> Drag columns to rearrange order, or specify the output order explicitly.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Renaming:</strong> Give columns new names in the output CSV without modifying the original file.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Data subsetting:</strong> Extract only the columns you need for analysis, reducing file size and complexity.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Privacy compliance:</strong> Remove sensitive columns (emails, phone numbers, IDs) before sharing datasets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Feature selection:</strong> Prepare training data for machine learning by selecting only relevant features.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Report preparation:</strong> Create focused reports with only the columns stakeholders need to see.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data transformation:</strong> Reorder columns to match a target system's expected column order.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (5 columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,name,email,phone,department
1,Alice,alice@example.com,555-0100,Engineering
2,Bob,bob@example.com,555-0101,Marketing`}
          </pre>
          <p className="text-muted-foreground mb-4">Select: name, email, department</p>
          <p className="text-muted-foreground mb-4">Output CSV (3 columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,email,department
Alice,alice@example.com,Engineering
Bob,bob@example.com,Marketing`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Column Index Reference
          </h2>
          <p className="text-muted-foreground mb-4">
            Column indices are 0-based (first column is 0, second is 1, etc.):
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Column:     id    name    email    phone    department
Index:      0     1       2        3        4`}
          </pre>
          <p className="text-muted-foreground mb-6">
            To extract name, email, and department, you'd specify indices 1, 2, 4 (or 2, 3, 5 if using 1-based indexing).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>GDPR compliance:</strong> A data analyst needs to share customer data with a contractor but must remove personal identifiers. They extract only purchase history columns, excluding names, emails, and addresses.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>ML feature engineering:</strong> A data scientist has a 100-column dataset but only 15 features are relevant for their model. They extract those 15 columns to reduce training time.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API response mapping:</strong> An API expects data in a specific column order. A developer reorders columns from their database export to match the API specification.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Legacy system migration:</strong> An old system expects columns in a specific order with specific names. Columns are extracted, reordered, and renamed to match.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance in the browser.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Column count:</strong> Files with thousands of columns may be slow to render the selection interface.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I extract non-contiguous columns?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Select any combination of columns regardless of their position in the original file.
          </p>

          <h3 className="text-xl font-semibold mb-2">What happens if I specify an index that doesn't exist?</h3>
          <p className="text-muted-foreground mb-4">
            Invalid indices are ignored. The tool extracts only columns that exist in the input file.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I duplicate columns in the output?</h3>
          <p className="text-muted-foreground mb-6">
            This tool doesn't support duplicating columns. Each selected column appears once in the output.
          </p>
        </div>
      </div>
    </>
  );
}
