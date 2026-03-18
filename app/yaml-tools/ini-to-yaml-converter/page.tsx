import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { IniToYamlConverter } from "@/components/yaml-tools/ini-to-yaml-converter.tsx";
import IniToYamlConverterSeo from "@/components/seo-content/yaml-tools/ini-to-yaml-converter";

export const metadata: Metadata = {
  title: `INI to YAML Converter | Free Online Tool`,
  description: `Convert INI files to YAML format instantly. Free online tool with validation and formatting. Perfect for modernizing configuration files.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/ini-to-yaml-converter`,
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

export default function IniToYamlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert INI to YAML Online</h1>
        <p className="text-muted-foreground">Easily upgrade your INI configuration files to YAML format. This free tool accurately converts sections and properties into a clean, readable YAML structure, ideal for modern DevOps and development workflows.</p>
      </header>
      {<IniToYamlConverter />}
      <div className="mt-8">
        <IniToYamlConverterSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
