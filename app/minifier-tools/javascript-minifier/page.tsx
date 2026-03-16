import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavaScriptMinifier from "@/components/minifier-tools/javascript-minifier";
import JavascriptMinifierSeo from "@/components/seo-content/minifier-tools/javascript-minifier";

export const metadata: Metadata = {
  title: `JavaScript Minifier - Compress JS Code Online`,
  description: `Free online JavaScript minifier. Compress JS files by removing whitespace, comments, and shortening variables to improve website performance and speed.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/javascript-minifier`,
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
    name: `JSON Minifier`,
    description: `JSON Minifier & Compressor Online`,
    href: `/minifier-tools/json-minifier`,
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

export default function JavascriptMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          JavaScript Minifier & Compressor Tool
        </h1>
        <p className="text-muted-foreground">
          Compress and minify JavaScript files to reduce load times. Our tool
          removes unnecessary characters, shortens variables, and optimizes your
          JS for production deployment.
        </p>
      </header>
      <div className="mt-8">
        <JavaScriptMinifier />
      </div>
      <div className="mt-8">
        <JavascriptMinifierSeo />
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
