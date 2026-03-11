import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CsvToTomlConverter from "@/components/toml-tools/csv-to-toml-converter";
import CsvToTomlConverterSEO from "@/components/seo-content/toml-tools/csv-to-toml-converter";

export const metadata: Metadata = {
  title: `CSV to TOML Converter | Import CSV to TOML Online`,
  description: `Convert CSV files to TOML array of tables format. Use column headers as keys. Infer data types and customize output structure. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/csv-to-toml-converter`,
  },
};

const tools = [
  {
    name: `TOML to JSON Converter`,
    description: `Convert TOML to JSON Instantly`,
    href: `/toml-tools/toml-to-json-converter`,
  },
  {
    name: `JSON to TOML Converter`,
    description: `Convert JSON to TOML Online`,
    href: `/toml-tools/json-to-toml-converter`,
  },
  {
    name: `TOML Validator and Linter`,
    description: `Validate and Lint Your TOML Files`,
    href: `/toml-tools/toml-validator-linter`,
  },
  {
    name: `TOML Beautifier and Formatter`,
    description: `Beautify and Format TOML Code`,
    href: `/toml-tools/toml-beautifier-formatter`,
  },
  {
    name: `TOML to YAML Converter`,
    description: `Convert TOML to YAML Easily`,
    href: `/toml-tools/toml-to-yaml-converter`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function CsvToTomlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert CSV to TOML Array of Tables
        </h1>
        <p className="text-muted-foreground">
          Turn CSV spreadsheet data into a TOML array of tables. This tool uses
          column headers as keys and each row becomes a table, perfect for
          config data sets.
        </p>
      </header>
      <div className="mt-8">
        <CsvToTomlConverter />
      </div>
      <div className="mt-8">
        <CsvToTomlConverterSEO />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
