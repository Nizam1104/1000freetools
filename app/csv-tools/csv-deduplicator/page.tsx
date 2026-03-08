import CsvDeduplicator from "@/components/csv-tools/csv-deduplicator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Deduplicator - Fuzzy Duplicate Detection with Similarity Threshold",
  description:
    "Remove near-duplicate rows from CSV using fuzzy matching. Levenshtein distance algorithm with adjustable similarity threshold. Free CSV fuzzy deduplication tool.",
  openGraph: {
    title: "CSV Deduplicator - Fuzzy Duplicate Detection with Similarity Threshold",
    description:
      "Find and remove near-duplicates using fuzzy matching with similarity scoring.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-deduplicator",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvDeduplicator />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool finds near-duplicate rows in your CSV using fuzzy string matching. Unlike exact duplicate removal, it catches typos, slight variations, and similar entries like "Jon Smith" vs "John Smith" or "Microsft" vs "Microsoft". Adjust the similarity threshold to control how strict the matching is.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How Fuzzy Matching Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool uses the Levenshtein distance algorithm to measure string similarity:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Levenshtein distance:</strong> Counts the minimum number of single-character edits (insertions, deletions, substitutions) needed to change one string into another.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Similarity score:</strong> Converts distance to a percentage. 100% means identical, 0% means completely different.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row similarity:</strong> For multi-column comparison, similarity is averaged across selected columns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Threshold:</strong> Rows with similarity above the threshold are considered duplicates.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Fuzzy Name Matching
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,company
John Smith,john@example.com,Microsoft
Jon Smith,jon@example.com,Microsft
Jane Doe,jane@example.com,Google
Jan Doe,jan@example.com,Googel`}
          </pre>
          <p className="text-muted-foreground mb-4">With 85% similarity threshold on name column:</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,email,company
John Smith,john@example.com,Microsoft
Jane Doe,jane@example.com,Google`}
          </pre>
          <p className="text-muted-foreground mb-4">"Jon Smith" matched "John Smith" (1 character difference = ~83% similarity)</p>
          <p className="text-muted-foreground mb-6">"Jan Doe" matched "Jane Doe" and "Googel" matched "Google"</p>

          <h2 className="text-2xl font-semibold mb-4">
            Similarity Threshold Guide
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>95-100%:</strong> Nearly identical. Catches only typos and minor variations.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>85-94%:</strong> Close matches. Good for catching common typos and transpositions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>75-84%:</strong> Moderate similarity. Catches more variations but may have false positives.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>50-74%:</strong> Loose matching. Use with caution — may match unrelated entries.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Recommendation:</strong> Start at 85% and adjust based on results. Review matches before finalizing.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use Fuzzy Deduplication
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Customer data cleanup:</strong> Merge entries like "IBM", "I.B.M.", and "International Business Machines".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Survey response cleaning:</strong> Catch variations in open-text responses like "USA", "U.S.A.", "United States".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Product catalog deduplication:</strong> Find similar product names from different suppliers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Lead list cleanup:</strong> Remove duplicate leads with slight name variations from multiple sources.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Address matching:</strong> Catch "123 Main St" vs "123 Main Street" vs "123 Main St.".
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Column Selection
          </h2>
          <p className="text-muted-foreground mb-4">
            Choose which columns to compare for similarity:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Single column:</strong> Compare only the most important identifier (email, ID, name).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Multiple columns:</strong> Average similarity across selected columns. More accurate but stricter.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Tip:</strong> For customer data, compare name + email together to avoid false matches on common names.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Visual Match Display
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool shows potential duplicates with their similarity scores:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Match Found:
  Row 1: John Smith (john@example.com)
  Row 2: Jon Smith (jon@example.com)
  Similarity: 89%
  
  [Keep Row 1] [Keep Row 2] [Keep Both]`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Review each match and decide which to keep before finalizing deduplication.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Performance:</strong> Fuzzy matching is O(n²) — comparing every row to every other row. Files over 10,000 rows may be very slow.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>False positives:</strong> Low thresholds may match unrelated entries. "Apple" and "Apply" are 80% similar but different.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Language limitations:</strong> Levenshtein works best for Latin alphabets. Non-Latin scripts may have different similarity characteristics.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">How is this different from Duplicate Remover?</h3>
          <p className="text-muted-foreground mb-4">
            Duplicate Remover finds exact matches only. Deduplicator finds near-matches using fuzzy string comparison.
          </p>

          <h3 className="text-xl font-semibold mb-2">What threshold should I use?</h3>
          <p className="text-muted-foreground mb-4">
            Start at 85% for most cases. Increase to 90-95% for stricter matching, decrease to 75-80% for more aggressive deduplication.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can this handle large datasets?</h3>
          <p className="text-muted-foreground mb-6">
            Fuzzy matching is computationally intensive. For datasets over 10,000 rows, consider using a dedicated deduplication tool or script.
          </p>
        </div>
      </div>
    </>
  );
}
