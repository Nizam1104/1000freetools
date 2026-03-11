import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import IniToTomlConverter from "@/components/toml-tools/ini-to-toml-converter";
import IniToTomlConverterSEO from "@/components/seo-content/toml-tools/ini-to-toml-converter";

export const metadata: Metadata = {
  title: `INI to TOML Converter | Free Online Utility`,
  description: `Convert INI configuration files to TOML format. Our tool parses sections and key-value pairs, outputting structured TOML. Perfect for config modernization.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/ini-to-toml-converter`,
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

export default function IniToTomlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert INI to TOML Online</h1>
        <p className="text-muted-foreground">
          Upgrade your old INI files to modern TOML. This tool converts INI
          sections into TOML tables, improving structure and readability for
          your configuration.
        </p>
      </header>
      <div className="mt-8">
        <IniToTomlConverter />
      </div>
      <div className="mt-8">
        <IniToTomlConverterSEO />
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
