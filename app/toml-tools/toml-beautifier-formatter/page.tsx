import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TomlBeautifierFormatter from "@/components/toml-tools/toml-beautifier-formatter";
import TomlBeautifierFormatterSEO from "@/components/seo-content/toml-tools/toml-beautifier-formatter";

export const metadata: Metadata = {
  title: `TOML Beautifier & Formatter | Clean Up TOML Online`,
  description: `Free TOML beautifier to format and indent your configuration files. Make TOML readable with consistent spacing. Also minify TOML for production.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/toml-beautifier-formatter`,
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

export default function TomlBeautifierFormatterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Beautify and Format TOML Code
        </h1>
        <p className="text-muted-foreground">
          Turn messy TOML into clean, readable configuration. Our formatter
          applies consistent indentation and spacing, making your TOML files
          easier to maintain and share with your team.
        </p>
      </header>
      <div className="mt-8">
        <TomlBeautifierFormatter />
      </div>
      <div className="mt-8">
        <TomlBeautifierFormatterSEO />
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
