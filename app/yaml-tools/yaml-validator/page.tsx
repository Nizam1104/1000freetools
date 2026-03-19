import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { YamlValidator } from "@/components/yaml-tools/yaml-validator";
import YamlValidatorSeo from "@/components/seo-content/yaml-tools/yaml-validator";

export const metadata: Metadata = {
  title: `Free YAML Validator | Check YAML Syntax Online`,
  description: `Validate YAML syntax and structure instantly. Find indentation errors, duplicate keys, and invalid types with detailed line-by-line feedback. No registration needed.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/yaml-validator`,
  },
};

const tools = [
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

export default function YamlValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free Online YAML Validator</h1>
        <p className="text-muted-foreground">
          Instantly validate your YAML files for syntax errors and structural
          issues. Our free tool provides clear, line-by-line feedback to ensure
          your configuration files are correct and ready to use. No sign-up
          required.
        </p>
      </header>
      <div className="mt-8">
        <YamlValidator />
      </div>
      <div className="mt-8">
        <YamlValidatorSeo />
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
