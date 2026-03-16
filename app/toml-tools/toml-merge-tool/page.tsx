import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TomlMergeTool from "@/components/toml-tools/toml-merge-tool";
import TomlMergeToolSEO from "@/components/seo-content/toml-tools/toml-merge-tool";

export const metadata: Metadata = {
  title: `TOML Merge Tool | Combine TOML Files Online`,
  description: `Merge multiple TOML configuration files into one. Handle conflicts with overwrite, skip, or rename options. Preview and edit the merged result.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/toml-merge-tool`,
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

export default function TomlMergeToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Merge Multiple TOML Files</h1>
        <p className="text-muted-foreground">
          Combine configurations from several TOML files into one. This merge
          tool lets you resolve conflicts and choose how to handle duplicate
          keys, creating a unified config.
        </p>
      </header>
      <div className="mt-8">
        <TomlMergeTool />
      </div>
      <div className="mt-8">
        <TomlMergeToolSEO />
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
