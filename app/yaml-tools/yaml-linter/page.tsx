import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { YamlLinter } from "@/components/yaml-tools/yaml-linter";
import YamlLinterSeo from "@/components/seo-content/yaml-tools/yaml-linter";

export const metadata: Metadata = {
  title: `YAML Linter | Style Checker & Validator`,
  description: `Lint YAML files for errors and style issues. Free online YAML linter with auto-fix suggestions to improve code quality and consistency.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/yaml-linter`,
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

export default function YamlLinterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Lint & Check YAML Style Online</h1>
        <p className="text-muted-foreground">Improve your YAML code quality with this free linter. It detects errors, style issues, and anti-patterns, offering fixes to ensure your YAML files are clean, valid, and follow best practices.</p>
      </header>
      {<YamlLinter />}
      <div className="mt-8">
        <YamlLinterSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
