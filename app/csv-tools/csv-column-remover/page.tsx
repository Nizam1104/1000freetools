import CsvColumnRemover from "@/components/csv-tools/csv-column-remover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Column Remover - Delete Unwanted Columns from CSV Files",
  description:
    "Remove selected columns from CSV by name or index. Invert selection to keep only specific columns. Free online CSV column deletion tool.",
  openGraph: {
    title: "CSV Column Remover - Delete Unwanted Columns from CSV Files",
    description:
      "Remove unwanted columns from CSV files by name or index.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-remover",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvColumnRemover />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool removes selected columns from your CSV file and creates a new CSV without those columns. Choose columns to delete by checking boxes or specifying indices. Use invert selection to quickly keep only a few columns by removing everything else.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Removal Methods
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>By name:</strong> Check boxes next to column names you want to remove. Visual selection for files with meaningful headers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>By index:</strong> Specify column positions to remove. Useful when you know exact positions or headers are missing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Invert selection:</strong> Select columns to KEEP, then invert to remove everything else. Faster when keeping only a few columns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Preview:</strong> See which columns will remain before processing.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Remove sensitive data:</strong> Delete columns containing PII (emails, phone numbers, SSNs) before sharing datasets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Clean up exports:</strong> Database exports often include internal IDs, timestamps, or audit columns you don't need.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Reduce file size:</strong> Remove unused columns to make files smaller and faster to process.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Simplify analysis:</strong> Focus on relevant columns by removing distracting or irrelevant data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Prepare for import:</strong> Remove columns that don't exist in the target system's schema.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (6 columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,name,email,phone,password_hash,department
1,Alice,alice@example.com,555-0100,abc123,Engineering
2,Bob,bob@example.com,555-0101,def456,Marketing`}
          </pre>
          <p className="text-muted-foreground mb-4">Remove: id, phone, password_hash</p>
          <p className="text-muted-foreground mb-4">Output CSV (3 columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,email,department
Alice,alice@example.com,Engineering
Bob,bob@example.com,Marketing`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Common Columns to Remove
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Internal IDs:</strong> Database primary keys, UUIDs, or system-generated identifiers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Timestamps:</strong> created_at, updated_at, last_login columns from database exports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Hashes and tokens:</strong> password_hash, api_token, session_id columns.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Technical metadata:</strong> _version, _rowid, etag columns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Empty columns:</strong> Columns with no data that were exported unnecessarily.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Column Remover vs Column Extractor
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Column Remover:</strong> Select columns to DELETE. Best when you want to keep most columns and remove a few.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Column Extractor:</strong> Select columns to KEEP. Best when you want only a few columns from many.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Many columns:</strong> Files with thousands of columns may be slow to render the selection interface.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I remove non-contiguous columns?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Select any combination of columns to remove regardless of their position.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if I remove all columns?</h3>
          <p className="text-muted-foreground mb-4">
            The tool will warn you or produce an empty CSV. At least one column must remain.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I undo the removal?</h3>
          <p className="text-muted-foreground mb-6">
            No. The output CSV doesn't contain removed columns. Keep a backup of your original file if you might need the removed data.
          </p>
        </div>
      </div>
    </>
  );
}
