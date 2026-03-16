import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TomlToXmlConverter from "@/components/toml-tools/toml-to-xml-converter";
import TomlToXmlConverterSEO from "@/components/seo-content/toml-tools/toml-to-xml-converter";

export const metadata: Metadata = {
  title: `TOML to XML Converter | Free Online Tool`,
  description: `Convert TOML files to XML format online. Customize root element and attribute mapping. Generate valid XML from TOML configuration instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/toml-to-xml-converter`,
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

export default function TomlToXmlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert TOML to XML Format</h1>
        <p className="text-muted-foreground">
          Need XML for legacy systems? Convert your TOML configurations to
          well-formed XML. This tool provides customizable mapping rules for
          tables and arrays.
        </p>
      </header>
      <div className="mt-8">
        <TomlToXmlConverter />
      </div>
      <div className="mt-8">
        <TomlToXmlConverterSEO />
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
