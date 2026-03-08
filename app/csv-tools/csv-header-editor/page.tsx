import CsvHeaderEditor from "@/components/csv-tools/csv-header-editor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Header Editor - Rename, Recase, and Clean CSV Column Headers",
  description:
    "Edit CSV column headers with inline editing, case conversion, find/replace, and bulk rename. Free online CSV header editing tool.",
  openGraph: {
    title: "CSV Header Editor - Rename, Recase, and Clean CSV Column Headers",
    description:
      "Rename and transform CSV column headers with bulk operations.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-header-editor",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvHeaderEditor />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool lets you edit CSV column headers quickly. Click any header to edit it inline, apply bulk case transformations (lowercase, uppercase, snake_case, camelCase), or use find/replace with regex support to rename multiple columns at once.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Header Editing Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Inline editing:</strong> Click any header cell, type the new name, press Enter to save.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Case conversion:</strong> Transform all headers to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            <li>lowercase — all lowercase</li>
            <li>UPPERCASE — all uppercase</li>
            <li>Title Case — First Letter Capitalized</li>
            <li>camelCase — first lowercase, rest capitalized</li>
            <li>PascalCase — All Words Capitalized</li>
            <li>snake_case — lowercase with underscores</li>
            <li>kebab-case — lowercase with hyphens</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Find and replace:</strong> Search for text or patterns in headers and replace them. Supports regex for advanced patterns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Case sensitive:</strong> Toggle case sensitivity for find/replace operations.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Case Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV headers:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`First Name,Last Name,Email Address,Phone Number`}
          </pre>
          <p className="text-muted-foreground mb-4">Convert to snake_case:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`first_name,last_name,email_address,phone_number`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Find and Replace
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV headers:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`user_id,user_name,user_email,created_at,updated_at`}
          </pre>
          <p className="text-muted-foreground mb-4">Find "user_", replace with "customer_"</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`customer_id,customer_name,customer_email,created_at,updated_at`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Regex Replace
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV headers:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`col_1, col_2, col_3, total_amount`}
          </pre>
          <p className="text-muted-foreground mb-4">Regex find: "col_(\d+)", replace: "field_$1"</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`field_1, field_2, field_3, total_amount`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports:</strong> Rename columns to match your database schema before importing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API compatibility:</strong> Adjust header names to match API field requirements.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Code generation:</strong> Convert headers to camelCase or snake_case for use as variable names.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Clean up exports:</strong> Fix messy headers from legacy systems with spaces, special characters, or inconsistent casing.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Standardization:</strong> Apply consistent naming conventions across multiple CSV files.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Case Conversion Guide
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>snake_case:</strong> Best for database columns, Python variables, Unix conventions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>camelCase:</strong> Standard for JavaScript, Java, and many programming languages.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>PascalCase:</strong> Used for C# classes, TypeScript types, and Go structs.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>kebab-case:</strong> Common in URL slugs, CSS classes, and HTML attributes.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>lowercase:</strong> Simple normalization for case-insensitive systems.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Regex Replace Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Capture groups:</strong> Use parentheses () to capture parts of the match, reference with $1, $2, etc. in replacement.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Common patterns:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`^\s+|\s+$     - Trim leading/trailing spaces
[^\w]         - Any non-word character
([a-z])([A-Z]) - CamelCase boundary
\d+           - Numbers`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Test first:</strong> Preview changes before applying to ensure the regex works as expected.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow rendering.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Many columns:</strong> Files with thousands of columns may be unwieldy to edit manually.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this modify the data rows?</h3>
          <p className="text-muted-foreground mb-4">
            No. Only header names change. All data rows remain exactly the same.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I undo header changes?</h3>
          <p className="text-muted-foreground mb-4">
            Use the reset button to restore original headers before exporting. Once exported, changes are permanent.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if two headers become the same name?</h3>
          <p className="text-muted-foreground mb-6">
            The tool allows duplicate headers, but this may cause issues in downstream tools. Ensure header names remain unique.
          </p>
        </div>
      </div>
    </>
  );
}
