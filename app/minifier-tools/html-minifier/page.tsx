import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlMinifier from "@/components/minifier-tools/html-minifier";
import HtmlMinifierSeo from "@/components/seo-content/minifier-tools/html-minifier";

export const metadata: Metadata = {
  title: `HTML Minifier - Compress & Minify HTML Code Online`,
  description: `Free online HTML minifier tool. Compress HTML files by removing whitespace, comments, and unnecessary code to improve website speed and performance.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/html-minifier`,
  },
};

const tools = [
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

export default function HtmlMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free HTML Minifier & Compressor
        </h1>
        <p className="text-muted-foreground">
          Reduce your HTML file size for faster page loads. Our free HTML
          minifier removes whitespace, comments, and redundant code while
          preserving functionality. Perfect for optimizing websites and web
          applications.
        </p>
      </header>
      <div className="mt-8">
        <HtmlMinifier />
      </div>
      <div className="mt-8">
        <HtmlMinifierSeo />
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
