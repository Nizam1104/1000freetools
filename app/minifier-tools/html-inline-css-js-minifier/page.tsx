import type { Metadata } from "next";
import HtmlInlineCssJsMinifierSeo from "@/components/seo-content/minifier-tools/html-inline-css-js-minifier";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlMinifier from "@/components/minifier-tools/html-minifier";

export const metadata: Metadata = {
  title: `HTML Inline CSS JS Minifier - Full Page Optimizer`,
  description: `Free tool to minify HTML along with inline CSS and JavaScript. Optimize entire web pages by compressing embedded styles and scripts within the HTML document.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/html-inline-css-js-minifier`,
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
    name: `XML Minifier`,
    description: `XML Minifier & Compressor Tool`,
    href: `/minifier-tools/xml-minifier`,
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

export default function HtmlInlineCssJsMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">HTML with Inline CSS/JS Minifier</h1>
        <p className="text-muted-foreground">Minify entire HTML pages, including inline CSS and JavaScript. This tool extracts, compresses, and re-inserts embedded styles and scripts, optimizing the whole document for speed.</p>
      </header>
      <div className="mt-8">
        <HtmlMinifier />
      </div>
      <div className="mt-16">
        <HtmlInlineCssJsMinifierSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
