import TsvToCsv from "@/components/csv-tools/tsv-to-csv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TSV to CSV Converter - Convert Tab-Separated to Comma-Separated Values",
  description:
    "Convert TSV (tab-separated values) files to CSV format. Properly quotes fields containing commas. Free online TSV to CSV converter.",
  openGraph: {
    title: "TSV to CSV Converter - Convert Tab-Separated to Comma-Separated Values",
    description:
      "Convert TSV files to CSV format with proper quoting for special characters.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/tsv-to-csv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            TSV to CSV Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert tab-separated TSV files to comma-separated CSV format. 
            Automatically quotes fields containing commas, quotes, or newlines.
          </p>
        </div>

        <TsvToCsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms TSV (tab-separated values) files into CSV (comma-separated values) format. It parses tab-delimited input and outputs RFC 4180 compliant CSV with proper quoting for fields containing special characters.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Why Convert TSV to CSV
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Email attachments:</strong> CSV is more universally recognized. Recipients can open CSV files directly in Excel without import dialogs.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API requirements:</strong> Many web services and APIs specifically require CSV format for data uploads.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Compatibility:</strong> Some older systems and tools only accept CSV, not TSV.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>European systems:</strong> While European systems often use semicolon-delimited CSV, standard comma-delimited CSV is still more common globally.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Database exports:</strong> Some databases export to TSV by default but your downstream tools expect CSV.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How the Conversion Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool parses TSV by splitting on tab characters. Since tabs rarely appear in actual data, TSV parsing is simpler than CSV — no complex quote handling needed on input.
          </p>
          <p className="text-muted-foreground mb-4">
            Output follows RFC 4180 CSV standards:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Quoting:</strong> Fields containing commas, double quotes, or newlines are wrapped in double quotes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Quote escaping:</strong> Double quotes within fields are escaped by doubling them (" becomes "").
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Line endings:</strong> Output uses consistent line endings (LF) for cross-platform compatibility.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input TSV (tabs shown as →):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name→description→price
Widget→A large, useful item→19.99
Gadget "Pro"→The "best" gadget→29.99`}
          </pre>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,description,price
Widget,"A large, useful item",19.99
"Gadget ""Pro""","The ""best"" gadget",29.99`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Delimiter Options
          </h2>
          <p className="text-muted-foreground mb-4">
            While this tool converts to standard comma-delimited CSV, you can also choose:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Semicolon:</strong> Standard in European countries where comma is the decimal separator.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Pipe (|):</strong> Useful for data that contains both commas and tabs.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Tab:</strong> Keeps the original TSV format (essentially a pass-through).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Tab characters in data:</strong> If your TSV contains literal tabs within field values (rare), the parser may split incorrectly. This is an inherent limitation of TSV format.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size:</strong> Works best with files under 50MB. Larger files depend on browser memory.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What if my TSV has quoted fields?</h3>
          <p className="text-muted-foreground mb-4">
            TSV typically doesn't use quotes since tabs rarely appear in data. If your file has quotes, they're treated as literal characters and will be properly escaped in the CSV output.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert CSV back to TSV?</h3>
          <p className="text-muted-foreground mb-4">
            Yes, use the CSV to TSV tool. It reverses the process, converting comma delimiters to tab delimiters.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this handle UTF-8 encoding?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Both input and output are UTF-8 encoded, preserving accented characters, emojis, and non-Latin scripts.
          </p>

          <h3 className="text-xl font-semibold mb-2">Will Excel open the converted CSV?</h3>
          <p className="text-muted-foreground mb-6">
            Yes. CSV opens directly in Excel. On Windows, you may need UTF-8 with BOM for accented characters to display correctly — use CSV Formatter to add BOM if needed.
          </p>
        </div>
      </div>
    </>
  );
}
