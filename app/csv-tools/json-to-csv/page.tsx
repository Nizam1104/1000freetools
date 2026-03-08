import JsonToCsv from "@/components/csv-tools/json-to-csv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Flatten JSON Arrays to CSV Format",
  description:
    "Convert JSON arrays of objects to CSV. Handles nested objects with dot notation flattening. Choose output delimiter. Free online JSON to CSV converter.",
  openGraph: {
    title: "JSON to CSV Converter - Flatten JSON Arrays to CSV Format",
    description:
      "Convert JSON arrays of objects to CSV with nested object flattening.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/json-to-csv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            JSON to CSV Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert JSON arrays of objects to CSV format. Automatically flattens 
            nested objects using dot notation. Choose your output delimiter.
          </p>
        </div>

        <JsonToCsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms JSON data into CSV format. It takes an array of JSON objects and creates a CSV where each object becomes a row and each key becomes a column header. Nested objects flatten to dot notation like "address.city" for compatibility with spreadsheet software.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input JSON:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`[
  {
    "name": "Alice",
    "age": 30,
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  },
  {
    "name": "Bob",
    "age": 25,
    "address": {
      "city": "Los Angeles",
      "zip": "90001"
    }
  }
]`}
          </pre>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,age,address.city,address.zip
Alice,30,New York,10001
Bob,25,Los Angeles,90001`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Conversion Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Flatten nested objects:</strong> When enabled, nested objects like {"{ address: { city: 'NYC' } }"} become flat columns like "address.city". Disable to get JSON string values instead.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Delimiter selection:</strong> Choose comma, semicolon, pipe, or tab as the output delimiter. Semicolon is common in European systems.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Array handling:</strong> Arrays within objects convert to JSON string representation (e.g., "[1, 2, 3]") since CSV can't represent nested structures.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>API data exports:</strong> Convert API responses from JSON to CSV for sharing with non-technical stakeholders or importing into Excel.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports:</strong> Transform JSON data into CSV for bulk imports into MySQL, PostgreSQL, or Google Sheets.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Report generation:</strong> Convert JSON query results to CSV for email reports or downstream analytics tools.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data migration:</strong> Export from NoSQL databases (MongoDB, CouchDB) and convert to CSV for relational database imports.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Machine learning pipelines:</strong> Convert JSON datasets to CSV for tools that require tabular input like scikit-learn or pandas.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How Nested Flattening Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The converter recursively walks through each object. When it finds a nested object, it prepends the parent key with a dot separator.
          </p>
          <p className="text-muted-foreground mb-4">
            Input: {"{ user: { name: { first: 'John', last: 'Doe' } } }"}
          </p>
          <p className="text-muted-foreground mb-4">
            Output columns: "user.name.first", "user.name.last"
          </p>
          <p className="text-muted-foreground mb-6">
            This preserves the full path to each value, making it clear where data came from in the original structure.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Handling Edge Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Missing keys:</strong> If some objects lack certain keys, those cells become empty in the CSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Arrays:</strong> Arrays can't be represented in CSV. They convert to JSON strings like "[1, 2, 3]".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Mixed types:</strong> If a key has different types across objects (string in one, number in another), both convert to CSV strings.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Special characters:</strong> Values containing commas, quotes, or newlines are properly quoted and escaped per RFC 4180.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Deep nesting:</strong> Very deeply nested JSON creates very long column names like "a.b.c.d.e.f". Consider flattening your data first if nesting exceeds 5-6 levels.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Arrays of objects:</strong> If a value is an array of objects, it flattens to a JSON string. CSV can't represent this structure natively.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Large files:</strong> JSON files over 50MB may cause slow performance. The entire file parses in your browser before conversion.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can this handle a single JSON object (not an array)?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. A single object converts to a single-row CSV. Keys become headers, values become the data row.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if my JSON has inconsistent keys across objects?</h3>
          <p className="text-muted-foreground mb-4">
            The tool collects all unique keys from all objects. Each object becomes a row, with empty cells where keys are missing.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this preserve data types?</h3>
          <p className="text-muted-foreground mb-4">
            CSV is plain text, so all values become strings. Numbers and booleans convert to their string representation ("30", "true").
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert CSV back to JSON?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the CSV to JSON tool. Dot notation headers like "address.city" can reconstruct nested objects if you enable the nested output option.
          </p>
        </div>
      </div>
    </>
  );
}
