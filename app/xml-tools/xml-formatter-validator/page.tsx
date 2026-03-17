import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlFormatterValidator from "@/components/xml-tools/xml-formatter-validator";

export const metadata: Metadata = {
  title: `Free XML Formatter & Validator Online | Beautify & Check XML`,
  description: `Format, beautify, and validate XML code online. Check for syntax errors, indent XML, and ensure it's well-formed. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/xml-formatter-validator`,
  },
};

const tools = [
  {
    name: `XML to JSON Converter`,
    description: `Convert XML to JSON Online`,
    href: `/xml-tools/xml-to-json-converter`,
  },
  {
    name: `JSON to XML Converter`,
    description: `Convert JSON to XML in Seconds`,
    href: `/xml-tools/json-to-xml-converter`,
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

export default function XmlFormatterValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Format and Validate Your XML Instantly
        </h1>
        <p className="text-muted-foreground">
          Paste your messy XML code to automatically format and indent it for
          perfect readability. Our tool also validates your XML in real-time,
          checking for syntax errors, missing tags, and compliance with W3C
          standards.
        </p>
      </header>
      <div className="mt-8"><XmlFormatterValidator /></div>
      {/* TODO: add seo component for xml-formatter-validator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
