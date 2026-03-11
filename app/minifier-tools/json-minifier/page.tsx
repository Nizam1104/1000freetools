import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JsonMinifier from "@/components/minifier-tools/json-minifier";
import JsonMinifierSeo from "@/components/seo-content/minifier-tools/json-minifier";

export const metadata: Metadata = {
  title: `JSON Minifier - Compress & Minify JSON Data Online`,
  description: `Free JSON minifier tool to compress JSON by removing whitespace. Optimize your API responses and configuration files for faster data transfer.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/json-minifier`,
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
    name: `XML Minifier`,
    description: `XML Minifier & Compressor Tool`,
    href: `/minifier-tools/xml-minifier`,
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

export default function JsonMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          JSON Minifier & Compressor Online
        </h1>
        <p className="text-muted-foreground">
          Minify JSON data to reduce transmission size for APIs and web
          applications. This tool removes whitespace and compresses JSON without
          altering the data structure.
        </p>
      </header>
      <div className="mt-8">
        <JsonMinifier />
      </div>
      <div className="mt-8">
        <JsonMinifierSeo />
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
