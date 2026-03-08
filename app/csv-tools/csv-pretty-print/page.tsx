import CsvPrettyPrint from "@/components/csv-tools/csv-pretty-print";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Pretty Print - Convert CSV to Formatted Text Tables",
  description:
    "Convert CSV data to human-readable aligned text tables. Perfect for documentation, README files, code comments, and terminal output.",
  openGraph: {
    title: "CSV Pretty Print - Convert CSV to Formatted Text Tables",
    description:
      "Convert CSV data to human-readable aligned text tables for documentation and code.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-pretty-print",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvPrettyPrint />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms raw CSV data into neatly aligned text tables using monospace formatting. Each column gets padded to fit the widest value, creating clean vertical alignment. The output works in plain text files, code comments, documentation, or terminal displays.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Output
          </h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name       | age | city
-----------|-----|------------
Alice      | 30  | New York
Bob        | 25  | Los Angeles
Charlie    | 35  | Chicago`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Columns are separated by pipes and aligned for readability. Headers are underlined with dashes. This format is easy to read in any text editor or terminal.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use Pretty Print
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>README documentation:</strong> Show sample data or configuration options in your GitHub README as a clean table instead of raw CSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Code comments:</strong> Document expected data formats or provide examples in source code comments where HTML tables won't render.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Terminal output:</strong> Generate formatted tables for CLI tools or scripts that output to console.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Email and chat:</strong> Share data snippets in plain text emails or Slack messages where formatting is limited.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Reports and specs:</strong> Include data examples in technical specifications or plain text reports.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Debugging:</strong> Quickly visualize CSV data structure when troubleshooting parsing issues.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool scans all values in each column to find the maximum width. It then pads every cell in that column with spaces so values align vertically. Headers get an underline row made of dashes.
          </p>
          <p className="text-muted-foreground mb-6">
            Column width is calculated as the longest value or header text, whichever is greater. This ensures nothing gets cut off and tables remain readable.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Developer documentation:</strong> A backend developer includes API response examples in a README. Pretty-printed tables show the data structure clearly without requiring readers to parse raw CSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database schema docs:</strong> Document table contents or sample records in plain text format that works in any editor.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Configuration examples:</strong> Show valid configuration values in a formatted table within a config file comment.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data quality reports:</strong> Generate plain text reports showing sample rows from each data source for stakeholder review.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Wide tables:</strong> Tables with many columns or long text values create very wide output that may not fit in your editor or terminal.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Monospace fonts required:</strong> Alignment only works when viewed with a monospace font (Courier, Consolas, etc.). Proportional fonts will misalign columns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>No word wrapping:</strong> Long values stay on one line. Very long cells make the table extremely wide.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I customize the table style?</h3>
          <p className="text-muted-foreground mb-4">
            This tool uses a simple pipe-and-dash format. For custom borders or styles, you'd need a different tool or manual formatting.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this work with Unicode characters?</h3>
          <p className="text-muted-foreground mb-4">
            Yes, but column width calculation may be off for some Unicode characters. Emoji and certain Asian characters display as different widths in different fonts, which can cause slight misalignment.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I export to Markdown tables instead?</h3>
          <p className="text-muted-foreground mb-4">
            For Markdown-formatted tables, use the CSV to Markdown tool. That generates GitHub-flavored Markdown table syntax with alignment markers.
          </p>

          <h3 className="text-xl font-semibold mb-2">What's the maximum file size?</h3>
          <p className="text-muted-foreground mb-6">
            Works best with files under 10MB or 50,000 rows. The tool needs to scan all data to calculate column widths, so very large files may be slow.
          </p>
        </div>
      </div>
    </>
  );
}
