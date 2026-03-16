import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CssMinifier from "@/components/minifier-tools/css-minifier";
import CssMinifierSeo from "@/components/seo-content/minifier-tools/css-minifier";

export const metadata: Metadata = {
  title: `CSS Minifier - Compress & Minify CSS Files Online`,
  description: `Free CSS minifier tool to compress and optimize your stylesheets. Remove comments and whitespace to reduce file size and boost page load times.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/css-minifier`,
  },
};

const tools = [
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
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

export default function CssMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          CSS Minifier & Compressor Online
        </h1>
        <p className="text-muted-foreground">
          Minify your CSS files to improve website speed. This tool removes
          comments, whitespace, and optimizes stylesheet syntax without changing
          functionality. Essential for front-end optimization.
        </p>
      </header>
      <div className="mt-8">
        <CssMinifier />
      </div>
      <div className="mt-8">
        <CssMinifierSeo />
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
