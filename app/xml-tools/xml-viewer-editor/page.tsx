import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlViewerEditorTool from "@/components/xml-tools/xml-viewer-editor";
import XmlViewerEditorSeo from "@/components/seo-content/xml-tools/xml-viewer-editor";

export const metadata: Metadata = {
  title: `Online XML Viewer & Editor | Edit XML Files Free`,
  description: `View and edit XML files online with a tree view and syntax highlighting. Edit directly, validate changes, and download. No software needed.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/xml-viewer-editor`,
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

export default function XmlViewerEditorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">View and Edit XML Online</h1>
        <p className="text-muted-foreground">
          Open, view, and edit XML files directly in your browser. The
          collapsible tree view and syntax highlighting make navigation easy,
          while built-in validation keeps your edits error-free.
        </p>
      </header>
      <div className="mt-8">
        <XmlViewerEditorTool />
      </div>
      <div className="mt-8">
        <XmlViewerEditorSeo />
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
