import CsvColumnMerger from "@/components/csv-tools/csv-column-merger";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Column Merger - Combine Multiple CSV Columns into One",
  description:
    "Merge multiple CSV columns into a single column with custom separator. Combine names, addresses, or any fields. Free online CSV column merging tool.",
  openGraph: {
    title: "CSV Column Merger - Combine Multiple CSV Columns into One",
    description:
      "Combine multiple CSV columns into one with custom separators.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-merger",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvColumnMerger />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool merges two or more columns from your CSV into a single new column. Select the columns to combine, choose a separator (space, comma, hyphen, etc.), and optionally remove the original columns after merging.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Merge Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Column selection:</strong> Choose which columns to merge. Select two or more columns in the order you want them combined.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Separator:</strong> Choose what goes between merged values: space, comma, hyphen, underscore, pipe, or custom character.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>New column name:</strong> Name the merged column. Default is "merged" or a combination of original names.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Remove original columns:</strong> Delete the source columns after merging to keep the CSV clean.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Merge Names
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`first_name,last_name,email
John,Smith,john@example.com
Jane,Doe,jane@example.com`}
          </pre>
          <p className="text-muted-foreground mb-4">Merge first_name + last_name with space separator, new column: full_name</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`full_name,email
John Smith,john@example.com
Jane Doe,jane@example.com`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Merge Address Parts
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`street,city,state,zip
123 Main St,Springfield,IL,62701
456 Oak Ave,Shelbyville,OH,43001`}
          </pre>
          <p className="text-muted-foreground mb-4">Merge all columns with ", " separator, new column: full_address</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`full_address
123 Main St, Springfield, IL, 62701
456 Oak Ave, Shelbyville, OH, 43001`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Create Composite Keys
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`country,year,product,sales
US,2024,Widget,1000
US,2024,Gadget,500
UK,2024,Widget,800`}
          </pre>
          <p className="text-muted-foreground mb-4">Merge country + year + product with "-" separator, new column: key</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`key,sales
US-2024-Widget,1000
US-2024-Gadget,500
UK-2024-Widget,800`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Full name creation:</strong> Combine first_name and last_name for display purposes or mail merges.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Address consolidation:</strong> Merge street, city, state, zip into a single address field for APIs that expect one line.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Composite keys:</strong> Create unique identifiers by combining multiple fields for joins or lookups.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Full text search:</strong> Combine multiple text columns into one for search indexing.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data simplification:</strong> Reduce column count by merging related fields that are always used together.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Separator Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Space:</strong> Default for names and natural language text.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Comma:</strong> Common for list-like data or CSV-in-CSV scenarios.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Hyphen:</strong> Good for composite keys or codes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Underscore:</strong> Common for database field names or programming identifiers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Pipe (|):</strong> Useful when data may contain commas or spaces.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Custom:</strong> Any character or string you need for your specific use case.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Handling Empty Values
          </h2>
          <p className="text-muted-foreground mb-4">
            When merging, empty cells are handled gracefully:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Empty in middle:</strong> "John" + "" + "Smith" with space separator becomes "John  Smith" (double space).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Empty at end:</strong> Trailing separators are typically not added for empty final columns.
          </p>
          <p className="text-muted-foreground mb-6">
            Consider cleaning empty values before merging if double separators are problematic.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Many columns:</strong> Merging dozens of columns creates very wide output that may be hard to work with.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I merge non-adjacent columns?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Select any columns in any order. They'll be merged in the order you select them.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if I want different separators for different columns?</h3>
          <p className="text-muted-foreground mb-4">
            This tool uses one separator for all columns. For varying separators, merge in multiple steps or use a script.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I split the merged column back later?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the CSV Column Splitter tool with the same separator to reverse the merge.
          </p>
        </div>
      </div>
    </>
  );
}
