import type { Metadata } from "next";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { XmlMinifier } from "@/components/minifier-tools/xml-minifier";

export const metadata: Metadata = {
  title: `XML Minifier - Compress & Minify XML Files Online`,
  description: `Free online XML minifier tool. Compress XML documents by removing whitespace and comments to optimize file size for web services and data exchange.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/xml-minifier`,
  },
};

const tools = [
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `CSS Minifier`,
    description: `CSS Minifier & Compressor Online`,
    href: `/minifier-tools/css-minifier`,
  },
  {
    name: `JavaScript Minifier`,
    description: `JavaScript Minifier & Compressor Tool`,
    href: `/minifier-tools/javascript-minifier`,
  },
  {
    name: `JSON Minifier`,
    description: `JSON Minifier & Compressor Online`,
    href: `/minifier-tools/json-minifier`,
  },
  {
    name: `SVG Minifier`,
    description: `SVG Minifier & Optimizer Online`,
    href: `/minifier-tools/svg-minifier`,
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

export default function XmlMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">XML Minifier & Compressor Tool</h1>
        <p className="text-muted-foreground">Compress XML files by removing extra spaces, comments, and line breaks. This minifier reduces file size for faster parsing and transmission while keeping the XML structure intact.</p>
      </header>
      {<XmlMinifier />}
      <div className="mt-16">
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
