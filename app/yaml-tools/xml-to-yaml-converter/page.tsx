import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { XmlToYamlConverter } from "@/components/yaml-tools/xml-to-yaml-converter.tsx";
import XmlToYamlConverterSeo from "@/components/seo-content/yaml-tools/xml-to-yaml-converter";

export const metadata: Metadata = {
  title: `XML to YAML Converter | Free Online Tool`,
  description: `Convert XML to YAML format online for free. Parse elements and attributes into clean YAML. Customize output structure and indentation. Instant conversion.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/xml-to-yaml-converter`,
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

export default function XmlToYamlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert XML to YAML Online</h1>
        <p className="text-muted-foreground">Easily convert XML files into cleaner, more readable YAML. This free tool is perfect for modernizing configurations or simplifying data structures.</p>
      </header>
      {<XmlToYamlConverter />}
      <div className="mt-8">
        <XmlToYamlConverterSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
