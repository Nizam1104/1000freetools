import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JsonToXmlConverterTool from "@/components/xml-tools/json-to-xml-converter";
import JsonToXmlConverterSeo from "@/components/seo-content/xml-tools/json-to-xml-converter";

export const metadata: Metadata = {
  title: `JSON to XML Converter | Free Online Transformation Tool`,
  description: `Convert JSON data to XML format online. Customize root tags, handle arrays, and generate valid XML instantly. Simple and free.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/json-to-xml-converter`,
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

export default function JsonToXmlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert JSON to XML in Seconds
        </h1>
        <p className="text-muted-foreground">
          Need XML from your JSON data? This tool creates well-formed XML
          documents from any JSON object, with full control over element names
          and structure.
        </p>
      </header>
      <div className="mt-8">
        <JsonToXmlConverterTool />
      </div>
      <div className="mt-8">
        <JsonToXmlConverterSeo />
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
