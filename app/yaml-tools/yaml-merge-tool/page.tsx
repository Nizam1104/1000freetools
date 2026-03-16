import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import YamlMergeTool from "@/components/yaml-tools/yaml-merge-tool";
import YamlMergeToolSeo from "@/components/seo-content/yaml-tools/yaml-merge-tool";

export const metadata: Metadata = {
  title: `YAML Merge Tool | Combine YAML Files Online`,
  description: `Merge two or more YAML files online with deep merging. Choose strategies for conflicts and combine arrays. Free tool for consolidating configurations.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/yaml-merge-tool`,
  },
};

const tools = [
  {
    name: `YAML Validator`,
    description: `Free Online YAML Validator`,
    href: `/yaml-tools/yaml-validator`,
  },
  {
    name: `YAML to JSON Converter`,
    description: `Convert YAML to JSON Online`,
    href: `/yaml-tools/yaml-to-json-converter`,
  },
  {
    name: `JSON to YAML Converter`,
    description: `Convert JSON to YAML Online`,
    href: `/yaml-tools/json-to-yaml-converter`,
  },
  {
    name: `YAML Formatter & Beautifier`,
    description: `YAML Formatter and Beautifier`,
    href: `/yaml-tools/yaml-formatter-beautifier`,
  },
  {
    name: `YAML Minifier & Compressor`,
    description: `YAML Minifier and Compressor`,
    href: `/yaml-tools/yaml-minifier-compressor`,
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

export default function YamlMergeToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Merge YAML Files Online</h1>
        <p className="text-muted-foreground">
          Combine multiple YAML documents into a single, unified file. This free
          merge tool lets you choose how to handle conflicts and deeply merge
          nested structures.
        </p>
      </header>
      <div className="mt-8">
        <YamlMergeTool />
      </div>
      <div className="mt-8">
        <YamlMergeToolSeo />
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
