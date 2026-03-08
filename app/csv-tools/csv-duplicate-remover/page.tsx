import CsvDuplicateRemover from "@/components/csv-tools/csv-duplicate-remover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Duplicate Remover - Remove Duplicate Rows from CSV Files",
  description:
    "Remove duplicate rows from CSV. Full-row comparison or key-column based deduplication. Keep first or last occurrence. Free online CSV deduplication tool.",
  openGraph: {
    title: "CSV Duplicate Remover - Remove Duplicate Rows from CSV Files",
    description:
      "Remove exact duplicate rows from CSV files with flexible options.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-duplicate-remover",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Duplicate Remover
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Remove duplicate rows from CSV files. Compare entire rows 
            or specific key columns. Choose to keep first or last occurrence.
          </p>
        </div>

        <CsvDuplicateRemover />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool removes duplicate rows from your CSV file. Choose between full-row comparison (all columns must match) or key-column based comparison (only specified columns are checked). Decide whether to keep the first or last occurrence of each duplicate.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Deduplication Modes
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Full-row comparison:</strong> Two rows are duplicates if ALL columns have identical values. Every field must match exactly.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Key-column based:</strong> Select one or more columns as the "key". Rows are duplicates if the key columns match, even if other columns differ.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Keep first:</strong> When duplicates are found, keep the first occurrence and remove later ones.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Keep last:</strong> When duplicates are found, keep the last occurrence and remove earlier ones. Useful when later rows have updated data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Full-Row Deduplication
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (with duplicates):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,department
Alice,alice@example.com,Engineering
Bob,bob@example.com,Marketing
Alice,alice@example.com,Engineering
Charlie,charlie@example.com,Sales`}
          </pre>
          <p className="text-muted-foreground mb-4">Remove full-row duplicates, keep first:</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,email,department
Alice,alice@example.com,Engineering
Bob,bob@example.com,Marketing
Charlie,charlie@example.com,Sales`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Key-Column Deduplication
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`email,name,last_login
alice@example.com,Alice Smith,2024-01-15
bob@example.com,Bob Jones,2024-01-10
alice@example.com,Alice Smith,2024-01-20
charlie@example.com,Charlie Brown,2024-01-12`}
          </pre>
          <p className="text-muted-foreground mb-4">Deduplicate by email column, keep last (most recent):</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`email,name,last_login
bob@example.com,Bob Jones,2024-01-10
alice@example.com,Alice Smith,2024-01-20
charlie@example.com,Charlie Brown,2024-01-12`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Email list cleaning:</strong> Remove duplicate email addresses from marketing lists before sending campaigns.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database export cleanup:</strong> Remove accidental duplicates from database exports caused by JOIN operations.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Survey response deduplication:</strong> Remove duplicate submissions from the same respondent.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Log file analysis:</strong> Remove repeated log entries to focus on unique events.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Product catalog cleanup:</strong> Remove duplicate product entries based on SKU or product ID.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Keep First vs Keep Last
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Keep first:</strong> Use when the first occurrence is the original/authoritative record. Good for preserving initial data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Keep last:</strong> Use when later rows represent updates or corrections. Common when data is appended over time with updates.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Statistics
          </h2>
          <p className="text-muted-foreground mb-4">
            After deduplication, the tool shows:
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>Original row count</li>
            <li>Rows after deduplication</li>
            <li>Number of duplicates removed</li>
            <li>Percentage reduction</li>
          </ul>
          <p className="text-muted-foreground mb-6">
            This helps you understand how much duplication existed in your data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Exact matching only:</strong> This tool finds exact duplicates. "John Smith" and "john smith" are NOT considered duplicates (case-sensitive).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Whitespace sensitivity:</strong> "Alice" and "Alice " (with trailing space) are different values. Clean data first if this is a concern.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this compare case-sensitively?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. "Alice" and "alice" are treated as different values. Clean casing before deduplication if needed.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I deduplicate based on multiple key columns?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Select multiple columns as the composite key. Rows are duplicates if ALL selected key columns match.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if I need fuzzy matching?</h3>
          <p className="text-muted-foreground mb-6">
            For near-duplicates (like "Jon Smith" vs "John Smith"), use the CSV Deduplicator tool which uses Levenshtein distance for fuzzy matching.
          </p>
        </div>
      </div>
    </>
  );
}
