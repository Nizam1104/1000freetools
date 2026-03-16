import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TomlToYamlConverter from "@/components/toml-tools/toml-to-yaml-converter";
import TomlToYamlConverterSEO from "@/components/seo-content/toml-tools/toml-to-yaml-converter";

export const metadata: Metadata = {
  title: `TOML to YAML Converter | Free Online Conversion Tool`,
  description: `Convert TOML files to YAML format online. Our tool handles complex nested structures and data types. Get clean YAML output instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/toml-to-yaml-converter`,
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

export default function TomlToYamlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert TOML to YAML Easily</h1>
        <p className="text-muted-foreground">
          Switch from TOML to YAML for your configuration needs. This converter
          accurately translates TOML tables and keys into YAML's structure,
          preserving all your data.
        </p>
      </header>
      <div className="mt-8">
        <TomlToYamlConverter />
      </div>
      <div className="mt-8">
        <TomlToYamlConverterSEO />
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
