import TextToCsv from "@/components/csv-tools/text-to-csv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to CSV Converter - Parse Unstructured Text to Structured CSV",
  description:
    "Convert plain text to CSV format. Parse by lines, regex patterns, or fixed-width columns. Free online text to CSV converter.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/text-to-csv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">


        <TextToCsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms unstructured plain text into structured CSV format. It offers three parsing modes: split by lines (whitespace-separated), extract with regex capture groups, or parse fixed-width columns. Define your column headers and get clean CSV output ready for spreadsheets or databases.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Parsing Modes
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>By Lines (whitespace):</strong> Each line becomes a CSV row. Words separated by spaces or tabs become columns.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
            {`Input:
Alice 30 New York
Bob 25 Los Angeles

Output CSV:
Alice,30,New York
Bob,25,Los Angeles`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>By Regex (capture groups):</strong> Define a regex pattern with capture groups. Each match becomes a row, each group becomes a column.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
            {`Input:
Name: Alice, Age: 30
Name: Bob, Age: 25

Regex: Name: (\w+), Age: (\d+)

Output CSV:
Alice,30
Bob,25`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Fixed Width:</strong> Specify column start positions and widths. Extracts data at exact character positions.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
            {`Input:
Alice     30New York   
Bob       25Los Angeles

Columns: 0-10, 10-13, 13-25

Output CSV:
Alice,30,New York
Bob,25,Los Angeles`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Log file parsing:</strong> Extract structured data from application logs, server logs, or command output.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Report extraction:</strong> Parse text reports from legacy systems into analyzable CSV format.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Terminal output:</strong> Convert command-line tool output (ps, netstat, df) into spreadsheet-ready data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fixed-width data:</strong> Parse mainframe exports, bank statements, or government data that uses fixed column positions.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Screen scraping:</strong> Extract data from text copied from terminal applications or legacy interfaces.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Regex Mode Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Capture groups:</strong> Use parentheses () to define columns. Each group becomes one CSV column.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Named groups:</strong> Some regex flavors support (?&lt;name&gt;...) for named capture groups.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Common patterns:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
            {`Email: ([\w.-]+@[\w.-]+)
Date: (\d{4}-\d{2}-\d{2})
Key-Value: (\w+): (\S+)
IP Address: (\d+\.\d+\.\d+\.\d+)`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Global matching:</strong> The tool finds all matches in the input text, not just the first one.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Fixed-Width Mode Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Column positions:</strong> Specify start position and width for each column (e.g., 0-10 means start at 0, width 10).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Trimming:</strong> Extracted values are trimmed of leading/trailing whitespace automatically.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Overlapping columns:</strong> Columns can overlap if needed, though this is unusual.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Variable length:</strong> If a line is shorter than expected, missing columns become empty.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Column Headers
          </h2>
          <p className="text-muted-foreground mb-4">
            Define custom column headers for your output CSV. If you don't specify headers, columns are named col1, col2, col3, etc.
          </p>
          <p className="text-muted-foreground mb-6">
            Headers appear in the first row of the output CSV, making the data self-documenting.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Output Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Delimiter selection:</strong> Choose comma, semicolon, pipe, or tab as the output CSV delimiter.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>UTF-8 encoding:</strong> Output preserves Unicode characters including accented letters, emojis, and non-Latin scripts.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Complex parsing:</strong> For highly structured or nested data, a scripting language may be more appropriate.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Regex limitations:</strong> The tool uses JavaScript regex syntax. Some advanced regex features may not be supported.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Large files:</strong> Works best with text under 10MB. Very large files may cause slow performance.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if my text has inconsistent formatting?</h3>
          <p className="text-muted-foreground mb-4">
            Regex mode handles variation well. Use optional groups (?:...)? and flexible patterns like \s+ for variable whitespace.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I parse multi-line records?</h3>
          <p className="text-muted-foreground mb-4">
            This tool processes line-by-line or extracts flat matches. Multi-line records require a different approach or scripting.
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I handle quoted values in the input?</h3>
          <p className="text-muted-foreground mb-6">
            Use regex mode with patterns that account for quotes, like "([^"]*)" to capture quoted strings.
          </p>
        </div>
      </div>
    </>
  );
}
