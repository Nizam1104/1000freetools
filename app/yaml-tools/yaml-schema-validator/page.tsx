import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { YamlSchemaValidator } from "@/components/yaml-tools/yaml-schema-validator";
import YamlSchemaValidatorSeo from "@/components/seo-content/yaml-tools/yaml-schema-validator";

export const metadata: Metadata = {
  title: `YAML Schema Validator | Validate Against JSON Schema`,
  description: `Validate YAML data against a JSON Schema online. Check structure, types, and constraints with detailed error reports. Supports Schema Draft 7 and 2020-12.`,
  alternates: {
    canonical: `https://1000freetools.com/yaml-tools/yaml-schema-validator`,
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

export default function YamlSchemaValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">YAML Schema Validator</h1>
        <p className="text-muted-foreground">Validate your YAML data against a JSON Schema definition. This advanced tool checks for correct structure, data types, and custom constraints, ensuring data integrity.</p>
      </header>
      {<YamlSchemaValidator />}
      <div className="mt-8">
        <YamlSchemaValidatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
