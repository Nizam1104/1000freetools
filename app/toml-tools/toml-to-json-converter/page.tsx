import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { TomlToJsonConverter } from "@/components/toml-tools/toml-to-json-converter";
import TomlToJsonConverterSEO from "@/components/seo-content/toml-tools/toml-to-json-converter";

export const metadata: Metadata = {
  title: `Free TOML to JSON Converter Online | 1000FreeTools`,
  description: `Convert TOML configuration files to JSON format instantly. No registration required. Supports syntax validation, error highlighting, and file download.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/toml-to-json-converter`,
  },
};

const tools = [
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
    name: `TOML to XML Converter`,
    description: `Convert TOML to XML Format`,
    href: `/toml-tools/toml-to-xml-converter`,
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

export default function TomlToJsonConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert TOML to JSON Instantly
        </h1>
        <p className="text-muted-foreground">
          Need to use a TOML config in a JSON-based system? Our free TOML to
          JSON converter parses your TOML data and generates valid JSON. It's
          fast, accurate, and handles nested tables and arrays perfectly.
        </p>
      </header>
      <div className="mt-8">
        <TomlToJsonConverter />
      </div>
      <div className="mt-8">
        <TomlToJsonConverterSEO />
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
