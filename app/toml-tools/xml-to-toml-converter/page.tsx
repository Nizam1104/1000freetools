import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlToTomlConverter from "@/components/toml-tools/xml-to-toml-converter";
import XmlToTomlConverterSEO from "@/components/seo-content/toml-tools/xml-to-toml-converter";

export const metadata: Metadata = {
  title: `XML to TOML Converter | Online Free Utility`,
  description: `Convert XML files to TOML configuration format. Our tool handles nested elements and attributes. Get clean TOML output from XML data.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/xml-to-toml-converter`,
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

export default function XmlToTomlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert XML to TOML Online</h1>
        <p className="text-muted-foreground">
          Simplify complex XML by converting it to human-readable TOML. This
          tool intelligently maps XML elements and attributes to TOML's table
          structure.
        </p>
      </header>
      <div className="mt-8">
        <XmlToTomlConverter />
      </div>
      <div className="mt-8">
        <XmlToTomlConverterSEO />
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
