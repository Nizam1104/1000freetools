import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlToJsonConverter from "@/components/xml-tools/xml-to-json-converter";
import XmlToJsonConverterSeo from "@/components/seo-content/xml-tools/xml-to-json-converter";

export const metadata: Metadata = {
  title: `XML to JSON Converter Online | Free & Accurate Tool`,
  description: `Convert XML to JSON instantly. Supports nested elements, attributes, and arrays. Get clean, formatted JSON output for your projects.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/xml-to-json-converter`,
  },
};

const tools = [
  {
    name: `XML Formatter and Validator`,
    description: `Format and Validate Your XML Instantly`,
    href: `/xml-tools/xml-formatter-validator`,
  },
  {
    name: `JSON to XML Converter`,
    description: `Convert JSON to XML in Seconds`,
    href: `/xml-tools/json-to-xml-converter`,
  },
  {
    name: `XML Minifier and Compressor`,
    description: `Minify and Compress XML Files`,
    href: `/xml-tools/xml-minifier-compressor`,
  },
  {
    name: `XML Viewer and Editor`,
    description: `View and Edit XML Online`,
    href: `/xml-tools/xml-viewer-editor`,
  },
  {
    name: `XML Schema (XSD) Generator`,
    description: `Generate XSD Schema from XML`,
    href: `/xml-tools/xml-schema-xsd-generator`,
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

export default function XmlToJsonConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert XML to JSON Online</h1>
        <p className="text-muted-foreground">
          Easily transform your XML data into clean JSON format. This converter
          handles complex nested structures and attributes, making it perfect
          for API integrations and modern web applications.
        </p>
      </header>
      <div className="mt-8">
        <XmlToJsonConverter />
      </div>
      <div className="mt-8">
        <XmlToJsonConverterSeo />
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
