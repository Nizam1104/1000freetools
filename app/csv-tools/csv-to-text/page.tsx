import CsvToText from "@/components/csv-tools/csv-to-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Text Converter - Generate Formatted Text from CSV with Templates",
  description:
    "Convert CSV data to formatted plain text using customizable templates. Generate emails, reports, or any text format from CSV rows.",
  openGraph: {
    title: "CSV to Text Converter - Generate Formatted Text from CSV with Templates",
    description:
      "Generate custom formatted text from CSV using templates.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-text",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to Text Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Generate formatted plain text from CSV data using customizable templates. 
            Create emails, reports, certificates, or any text format from your data.
          </p>
        </div>

        <CsvToText />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into formatted plain text using templates you define. Each CSV row generates a text block based on your template. Use placeholders like {"{{name}}"} or {"{{email}}"} to insert column values. Perfect for generating personalized emails, certificates, reports, or any repetitive text document.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Template Syntax
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Column placeholders:</strong> Use {"{{column_name}}"} to insert values from specific columns.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row placeholder:</strong> Use {"{{row}}"} to insert the entire row as text.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Index placeholder:</strong> Use {"{{index}}"} to insert the row number (0-based).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Row separator:</strong> Define what goes between each row's output (newline, dashes, etc.).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Field templates:</strong> Use {"{{header}}: {{value}}"} format for key-value pair output.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Templates
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,course
Alice,alice@example.com,Python Basics
Bob,bob@example.com,Web Development`}
          </pre>
          <p className="text-muted-foreground mb-4">Template for welcome emails:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Hi {{name}},

Welcome to {{course}}!

Your account email: {{email}}

Get started at: https://example.com/start

Thanks,
The Team`}
          </pre>
          <p className="text-muted-foreground mb-4">Output:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Hi Alice,

Welcome to Python Basics!

Your account email: alice@example.com

Get started at: https://example.com/start

Thanks,
The Team

---

Hi Bob,

Welcome to Web Development!

Your account email: bob@example.com

Get started at: https://example.com/start

Thanks,
The Team`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Email campaigns:</strong> Generate personalized email drafts from a CSV of recipients and their details.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Certificates:</strong> Create certificate text for each participant with their name, course, and completion date.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Reports:</strong> Generate standardized report sections for each item in a data list.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Product descriptions:</strong> Create formatted product descriptions from a catalog CSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Invitation letters:</strong> Generate personalized invitations with recipient names, event details, and RSVP info.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Code generation:</strong> Create repetitive code snippets, config entries, or SQL statements from data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Template Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Use blank lines:</strong> Add blank lines in your template for paragraph breaks in output.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Static text:</strong> Any text that's not a placeholder appears verbatim in output.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Special characters:</strong> Literal curly braces need escaping if your template system supports it.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Row separators:</strong> Use "---" or blank lines to separate output from different rows.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Common Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Mail merge alternative:</strong> Generate personalized letters without Word or email client dependencies.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Bulk document creation:</strong> Create multiple similar documents (contracts, proposals, invoices) from a data list.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data export for humans:</strong> Convert CSV rows to readable text summaries for stakeholder review.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>API payload generation:</strong> Create request bodies or configuration snippets from data tables.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>No conditional logic:</strong> Templates can't include if/else conditions. All rows use the same template structure.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>No calculations:</strong> Can't perform math or string operations within templates.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Missing values:</strong> If a column is empty for a row, the placeholder becomes empty text. No default value support.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I use column names with spaces?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Use the exact column header in your placeholder: {"{{First Name}}"} for a column named "First Name".
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I handle special characters in placeholders?</h3>
          <p className="text-muted-foreground mb-4">
            If you need literal curly braces in output, check if the tool supports escaping. Otherwise, you may need to post-process the output.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I generate different templates for different rows?</h3>
          <p className="text-muted-foreground mb-6">
            Not with this tool. All rows use the same template. For conditional templates, use a scripting language like Python or JavaScript.
          </p>
        </div>
      </div>
    </>
  );
}
