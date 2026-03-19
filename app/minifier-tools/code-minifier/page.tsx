import type { Metadata } from "next";
import CodeMinifierSeo from "@/components/seo-content/minifier-tools/code-minifier";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CodeMinifier from "@/components/minifier-tools/code-minifier";

export const metadata: Metadata = {
  title: `Code Minifier - Compress Multiple Languages Online`,
  description: `Free multi-language code minifier tool. Compress HTML, CSS, JS, JSON, XML, and other code types in one interface to optimize your entire project.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/code-minifier`,
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

export default function CodeMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Multi-Language Code Minifier</h1>
        <p className="text-muted-foreground">Minify code from various programming languages in one place. This versatile tool supports HTML, CSS, JavaScript, JSON, and more, optimizing all your web assets simultaneously.</p>
      </header>
      {<CodeMinifier />}
      <div className="mt-16">
        <CodeMinifierSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
