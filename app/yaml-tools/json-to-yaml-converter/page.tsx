import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JsonToYamlConverterTool from "@/components/yaml-tools/json-to-yaml-converter";
import JsonToYamlConverterSeo from "@/components/seo-content/yaml-tools/json-to-yaml-converter";

export const metadata: Metadata = {
  title: `JSON to YAML Converter | Free Online Tool`,
  description: `Convert JSON to YAML format online for free. Get clean, readable YAML output with proper indentation. Validate JSON and customize YAML style instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/json-to-yaml-converter`,
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
    name: `YAML Diff Checker`,
    description: `YAML Diff Checker & Comparator`,
    href: `/yaml-tools/yaml-diff-checker`,
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

export default function JsonToYamlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert JSON to YAML Online</h1>
        <p className="text-muted-foreground">
          Easily transform your JSON data into a clean, readable YAML format.
          Perfect for configuration files, this free tool ensures proper syntax
          and indentation.
        </p>
      </header>
      <div className="mt-8">
        <JsonToYamlConverterTool />
      </div>
      <div className="mt-8">
        <JsonToYamlConverterSeo />
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
