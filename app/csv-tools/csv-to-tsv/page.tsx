import CsvToTsv from "@/components/csv-tools/csv-to-tsv";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to TSV Converter - Convert Comma-Separated to Tab-Separated Values",
  description:
    "Convert CSV files to TSV (tab-separated values) format. Properly handles quoted fields containing tabs. Free online CSV to TSV converter.",
  openGraph: {
    title: "CSV to TSV Converter - Convert Comma-Separated to Tab-Separated Values",
    description:
      "Convert CSV files to TSV format with proper handling of quoted fields.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-tsv",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to TSV Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert comma-separated CSV files to tab-separated TSV format. 
            Properly handles quoted fields and embedded delimiters.
          </p>
        </div>

        <CsvToTsv />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV (comma-separated values) into TSV (tab-separated values) format. It properly parses CSV quoting rules, handles embedded commas within quoted fields, and outputs clean tab-delimited data ready for databases, spreadsheets, or data processing tools.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use TSV Instead of CSV
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Text data with commas:</strong> If your data contains lots of commas (like addresses or descriptions), tabs work better as delimiters since they rarely appear in normal text.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports:</strong> PostgreSQL COPY command and MySQL LOAD DATA often prefer TSV for simpler parsing without quote handling.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Unix tools:</strong> Command-line tools like awk, cut, and column work naturally with tab-delimited data using the -f and -d flags.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Google Sheets imports:</strong> TSV imports cleanly without ambiguity about comma handling in different locales.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Programming language parsing:</strong> Many languages have simpler TSV parsers since tabs don't require quote escaping logic.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How the Conversion Works
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool uses the PapaParse library to properly parse CSV according to RFC 4180 rules. It handles:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Quoted fields:</strong> Fields wrapped in quotes can contain commas, which aren't treated as delimiters.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Escaped quotes:</strong> Double quotes inside quoted fields ("") convert to single quotes in the output.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Embedded newlines:</strong> Multi-line values within quoted fields are preserved correctly.
          </p>
          <p className="text-muted-foreground mb-6">
            After parsing, the tool outputs each field separated by a tab character (\t) instead of a comma.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,description,price
"Widget, Large","A large widget, useful for things",19.99
"Gadget ""Pro""","The best gadget",29.99`}
          </pre>
          <p className="text-muted-foreground mb-4">Output TSV (tabs shown as →):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name→description→price
Widget, Large→A large widget, useful for things→19.99
Gadget "Pro"→The best gadget→29.99`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Technical Details
          </h2>
          <p className="text-muted-foreground mb-4">
            TSV format is simpler than CSV in some ways — tabs rarely appear in data, so quoting is often unnecessary. However, this converter still properly quotes any TSV fields that contain tabs, preserving data integrity.
          </p>
          <p className="text-muted-foreground mb-6">
            Output is UTF-8 encoded, supporting all Unicode characters including accented letters, emojis, and non-Latin scripts.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Tab characters in data:</strong> If your CSV contains literal tab characters within fields, the output may have ambiguous delimiters. This is rare but possible.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size:</strong> Works best with files under 50MB. Larger files depend on browser memory for parsing.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">What's the difference between CSV and TSV?</h3>
          <p className="text-muted-foreground mb-4">
            CSV uses commas as field separators; TSV uses tabs. TSV is often simpler because tabs rarely appear in data, while commas are common in text.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert TSV back to CSV?</h3>
          <p className="text-muted-foreground mb-4">
            Yes, use the TSV to CSV tool. It reverses the process, converting tab delimiters back to comma delimiters with proper quoting.
          </p>

          <h3 className="text-xl font-semibold mb-2">Will Excel open TSV files?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Excel can open TSV files directly. You may need to use Data → From Text/CSV and select tab as the delimiter during import.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this preserve UTF-8 encoding?</h3>
          <p className="text-muted-foreground mb-6">
            Yes. Output is UTF-8 encoded, preserving accented characters, emojis, and non-Latin scripts.
          </p>
        </div>
      </div>
    </>
  );
}
