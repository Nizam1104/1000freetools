import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlSchemaXsdGenerator from "@/components/xml-tools/xml-schema-xsd-generator";
import XmlSchemaXsdGeneratorSeo from "@/components/seo-content/xml-tools/xml-schema-xsd-generator";

export const metadata: Metadata = {
  title: `XSD Generator from XML | Free XML Schema Creator`,
  description: `Generate an XML Schema (XSD) file automatically from any XML document. Define structure, data types, and constraints instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/xml-schema-xsd-generator`,
  },
};

const tools = [
  {
    name: `XML Formatter and Validator`,
    description: `Format and Validate Your XML Instantly`,
    href: `/xml-tools/xml-formatter-validator`,
  },
  {
    name: `XML to JSON Converter`,
    description: `Convert XML to JSON Online`,
    href: `/xml-tools/xml-to-json-converter`,
  },

  {
    name: `XML Minifier and Compressor`,
    description: `Minify and Compress XML Files`,
    href: ``,
  },
  {
    name: `XML Viewer and Editor`,
    description: `View and Edit XML Online`,
    href: `/xml-tools/xml-viewer-editor`,
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

export default function XmlSchemaXsdGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Generate XSD Schema from XML
        </h1>
        <p className="text-muted-foreground">
          Automatically create an XML Schema (XSD) from your XML document. This
          tool analyzes the structure and data types to build a accurate schema
          definition.
        </p>
      </header>
      <div className="mt-8"><XmlSchemaXsdGenerator /></div>
      <div className="mt-8">
        <XmlSchemaXsdGeneratorSeo />
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
