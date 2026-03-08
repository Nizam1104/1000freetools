import CsvToArray from "@/components/csv-tools/csv-to-array";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Array Converter - Convert CSV to JavaScript, Python, PHP, Ruby Arrays",
  description:
    "Convert CSV files to programming language arrays. Supports JavaScript, Python, PHP, and Ruby with object or array output formats.",
  openGraph: {
    title: "CSV to Array Converter - Convert CSV to JavaScript, Python, PHP, Ruby Arrays",
    description:
      "Convert CSV to arrays for JavaScript, Python, PHP, and Ruby.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-array",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to Array Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert CSV data to programming language arrays. 
            Generate JavaScript, Python, PHP, or Ruby array literals ready to paste into code.
          </p>
        </div>

        <CsvToArray />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into native array syntax for popular programming languages. Each CSV row becomes an array element or object. Choose between objects with named properties or simple arrays of arrays. Output is properly escaped and formatted for direct use in your code.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Language Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>JavaScript:</strong> Generates array literals with proper string escaping. Supports both object arrays and nested arrays.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Objects
[
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
]

// Arrays
[
  ["Alice", 30],
  ["Bob", 25]
]`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Python:</strong> Generates list literals with Python syntax. Strings use single quotes by convention.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Objects (list of dicts)
[
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 25}
]

# Arrays
[
    ['Alice', 30],
    ['Bob', 25]
]`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>PHP:</strong> Generates PHP array syntax with proper escaping.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Objects (associative arrays)
[
    ['name' => 'Alice', 'age' => 30],
    ['name' => 'Bob', 'age' => 25]
]

// Arrays
[
    ['Alice', 30],
    ['Bob', 25]
]`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Ruby:</strong> Generates Ruby array syntax with proper string escaping.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Objects (array of hashes)
[
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
]

# Arrays
[
    ['Alice', 30],
    ['Bob', 25]
]`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Output Format Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Objects with named properties:</strong> Each row becomes an object/dict/hash with column headers as keys. Best when you need to reference fields by name.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Arrays of arrays:</strong> Each row becomes a simple array. Best for positional access or when column order matters more than names.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Seed data for applications:</strong> Convert spreadsheet data to code arrays for initial database seeding or test fixtures.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Configuration data:</strong> Embed lookup tables, validation lists, or configuration options directly in source code.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Test data:</strong> Generate test cases from CSV test specifications for unit tests.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Static site generation:</strong> Include data arrays in build scripts for generating pages from CSV content.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Quick prototyping:</strong> Paste CSV data directly into code without manually typing array syntax.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            String Escaping
          </h2>
          <p className="text-muted-foreground mb-4">
            The converter properly escapes special characters for each language:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>JavaScript:</strong> Escapes backslashes, quotes, newlines, and Unicode characters.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Python:</strong> Handles quotes, backslashes, and special characters in string literals.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>PHP:</strong> Escapes for both single and double-quoted string contexts.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Ruby:</strong> Proper escaping for single and double-quoted strings, including interpolation characters.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Type Handling
          </h2>
          <p className="text-muted-foreground mb-4">
            All CSV values are output as strings in the generated code. If you need numeric or boolean types:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>JavaScript:</strong> Manually remove quotes from numeric values or use JSON.parse().
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Python:</strong> Use ast.literal_eval() or manually convert types after loading.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>PHP:</strong> Cast values explicitly or use json_decode(json_encode($array)).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Ruby:</strong> Use type conversion methods like to_i or to_f on values.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large datasets:</strong> Arrays with thousands of elements make source code unwieldy. Consider loading from external files for large data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>No nested structures:</strong> CSV is flat, so output is flat arrays. Nested structures require manual editing.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size:</strong> Works best with CSV files under 5MB. Larger files generate very long code output.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I use this for TypeScript?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. JavaScript array output is valid TypeScript. Add type annotations manually if needed.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this handle UTF-8 characters?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Unicode characters are preserved and properly escaped for each language's string literal syntax.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert arrays back to CSV?</h3>
          <p className="text-muted-foreground mb-6">
            This tool only converts CSV to arrays. For the reverse, you'd need a script in your target language to output CSV format.
          </p>
        </div>
      </div>
    </>
  );
}
