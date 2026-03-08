import CsvToJson from "@/components/csv-tools/csv-to-json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter - Convert CSV to JSON Array with Type Inference",
  description:
    "Convert CSV files to JSON array of objects. Options for type inference, nested output from dot notation, and array mode. Free online CSV to JSON converter.",
  openGraph: {
    title: "CSV to JSON Converter - Convert CSV to JSON Array with Type Inference",
    description:
      "Convert CSV files to JSON array of objects with type inference and nested output options.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-json",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvToJson />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into JSON format. Each CSV row becomes a JSON object with column headers as keys. You get a clean JSON array ready for APIs, JavaScript code, or NoSQL databases. Options include automatic type inference and nested object creation from dot notation headers.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Conversion Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Type inference:</strong> Automatically converts values to appropriate JSON types. Numbers become numbers (not strings), "true" and "false" become booleans, empty cells become null.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Nested output:</strong> Headers with dot notation like "address.city" or "user.name.first" create nested JSON objects instead of flat keys.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Array mode:</strong> Outputs arrays of values instead of objects with named keys. Useful when you only care about position, not field names.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Pretty-printed output:</strong> JSON is formatted with 2-space indentation for readability. Copy directly into code or save as .json files.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,age,active,city
Alice,30,true,New York
Bob,25,false,Los Angeles`}
          </pre>
          <p className="text-muted-foreground mb-4">Output JSON (with type inference):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`[
  {
    "name": "Alice",
    "age": 30,
    "active": true,
    "city": "New York"
  },
  {
    "name": "Bob",
    "age": 25,
    "active": false,
    "city": "Los Angeles"
  }
]`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>API development:</strong> Convert spreadsheet data to JSON for API responses or seed data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>JavaScript projects:</strong> Import CSV data as JSON objects directly into your code without manual conversion.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>MongoDB imports:</strong> Transform CSV exports into JSON documents for bulk insertion into NoSQL databases.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Configuration files:</strong> Convert data tables to JSON for use as app configuration or localization files.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data pipelines:</strong> Transform CSV source data into JSON for downstream processing in Node.js or Python scripts.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Type Inference Details
          </h2>
          <p className="text-muted-foreground mb-4">
            When enabled, the converter analyzes each value:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Numbers:</strong> "42", "3.14", "-17" become JSON numbers. Scientific notation like "1.5e10" is supported.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Booleans:</strong> "true" and "false" (case-insensitive) become JSON booleans.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Null:</strong> Empty cells, "null", "NULL", and "None" become JSON null.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Strings:</strong> Everything else stays as a string. Dates, emails, and IDs remain quoted.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Nested Output from Dot Notation
          </h2>
          <p className="text-muted-foreground mb-4">
            If your CSV has headers like "user.name", "user.email", "address.city", enabling nested output creates:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`{
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  },
  "address": {
    "city": "New York"
  }
}`}
          </pre>
          <p className="text-muted-foreground mb-6">
            This is useful when exporting from systems that flatten nested structures into CSV using dot notation.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Deeply nested JSON:</strong> If converting back from complex nested JSON, the flattening to dot notation may not perfectly reconstruct the original structure.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Arrays in values:</strong> CSV can't represent nested arrays. Values like "[1, 2, 3]" stay as strings.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Large files:</strong> Files over 50MB may cause slow performance or browser memory issues during conversion.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this handle UTF-8 and special characters?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. The converter preserves UTF-8 encoding including accented characters, emojis, and non-Latin scripts. JSON output is properly escaped.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert JSON back to CSV?</h3>
          <p className="text-muted-foreground mb-4">
            Yes, use the JSON to CSV tool. Note that nested JSON flattens to dot notation headers, and arrays may not convert cleanly.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if my CSV has no headers?</h3>
          <p className="text-muted-foreground mb-4">
            The first row is always treated as headers. If your CSV lacks headers, add a row with column names before converting, or use array mode which ignores headers.
          </p>

          <h3 className="text-xl font-semibold mb-2">Is there a row limit?</h3>
          <p className="text-muted-foreground mb-6">
            No hard limit, but performance depends on your browser. Files with 10,000-50,000 rows convert quickly. Larger files may be slow or cause memory issues.
          </p>
        </div>
      </div>
    </>
  );
}
