import CsvColumnSplitter from "@/components/csv-tools/csv-column-splitter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Column Splitter - Split One Column into Multiple by Delimiter or Regex",
  description:
    "Split a single CSV column into multiple columns. Split by delimiter, regex pattern, or fixed width. Free online CSV column splitting tool.",
  openGraph: {
    title: "CSV Column Splitter - Split One Column into Multiple by Delimiter or Regex",
    description:
      "Split CSV columns by delimiter, regex, or fixed width.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-splitter",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Column Splitter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Split a single CSV column into multiple columns. 
            Split by delimiter, regex capture groups, or fixed widths.
          </p>
        </div>

        <CsvColumnSplitter />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool splits one column from your CSV into multiple separate columns. Choose a column to split, specify how to split it (delimiter, regex, or fixed width), and get new columns with the separated values. Optionally remove the original column after splitting.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Split Methods
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>By delimiter:</strong> Split on a character like comma, space, hyphen, or pipe. "John Doe" splits to "John" and "Doe" on space.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>By regex:</strong> Use a regular expression pattern for complex splits. Capture groups become separate columns.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fixed width:</strong> Split at specific character positions. Useful for fixed-format data like "CA90210" splitting to "CA" and "90210".
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Preview:</strong> See the split results before exporting to verify the output.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Split by Delimiter
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,full_name,email
1,John Smith,john@example.com
2,Jane Doe,jane@example.com`}
          </pre>
          <p className="text-muted-foreground mb-4">Split "full_name" on space, new columns: first_name, last_name</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,first_name,last_name,email
1,John,Smith,john@example.com
2,Jane,Doe,jane@example.com`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Split by Regex
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,code
1,ABC-123-XYZ
2,DEF-456-UVW`}
          </pre>
          <p className="text-muted-foreground mb-4">Regex: (\w+)-(\d+)-(\w+), columns: prefix, number, suffix</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,prefix,number,suffix
1,ABC,123,XYZ
2,DEF,456,UVW`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Fixed Width Split
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,state_zip
1,CA90210
2,NY10001`}
          </pre>
          <p className="text-muted-foreground mb-4">Split at position 2: state (0-2), zip (2-7)</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,state,zip
1,CA,90210
2,NY,10001`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Name parsing:</strong> Split "full_name" into "first_name" and "last_name" for personalized communications.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Address parsing:</strong> Split "address" into "street", "city", "state", "zip" components.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Product codes:</strong> Split SKU like "CAT-123-RED" into category, item number, and color.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Date parsing:</strong> Split "2024-01-15" into year, month, day columns for analysis.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Phone number parsing:</strong> Split "(555) 123-4567" into area code, prefix, line number.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Regex Split Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Capture groups:</strong> Each () in your regex becomes a new column.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Common patterns:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`(\w+)\s+(\w+)     - Two words separated by space
(\d+)-(\d+)       - Two numbers separated by hyphen
(.+)@(.+)         - Email local part and domain
(\w+):(\d+)       - Key:value pairs`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Non-capturing groups:</strong> Use (?:...) for groups you don't want as separate columns.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Inconsistent data:</strong> If some rows don't match your split pattern, they may produce empty columns or errors.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Variable parts:</strong> Names with middle names or suffixes won't split cleanly into just first/last.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if some rows don't have the delimiter?</h3>
          <p className="text-muted-foreground mb-4">
            Those rows will have the full value in the first new column, with remaining columns empty.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I split on multiple delimiters?</h3>
          <p className="text-muted-foreground mb-4">
            Use regex mode with a character class like [-_\s] to split on hyphens, underscores, or whitespace.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I keep the original column?</h3>
          <p className="text-muted-foreground mb-6">
            Yes. Toggle the "remove original column" option to keep both the original and the new split columns.
          </p>
        </div>
      </div>
    </>
  );
}
