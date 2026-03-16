import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JsonToTomlConverter from "@/components/toml-tools/json-to-toml-converter";
import JsonToTomlConverterSEO from "@/components/seo-content/toml-tools/json-to-toml-converter";

export const metadata: Metadata = {
  title: `JSON to TOML Converter | Free Online Tool`,
  description: `Easily convert JSON data to TOML configuration format. Our free tool validates JSON and outputs clean, human-readable TOML. Download or copy results.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/json-to-toml-converter`,
  },
};

const tools = [
  {
    name: `TOML to JSON Converter`,
    description: `Convert TOML to JSON Instantly`,
    href: `/toml-tools/toml-to-json-converter`,
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

export default function JsonToTomlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert JSON to TOML Online</h1>
        <p className="text-muted-foreground">
          Simplify your configuration by converting JSON objects to the more
          readable TOML format. Our tool ensures proper formatting of tables,
          arrays, and key-value pairs, making integration with TOML-based
          systems easy.
        </p>
      </header>
      <div className="mt-8">
        <JsonToTomlConverter />
      </div>
      <div className="mt-8">
        <JsonToTomlConverterSEO />
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
