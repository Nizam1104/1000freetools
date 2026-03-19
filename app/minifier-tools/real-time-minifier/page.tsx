import type { Metadata } from "next";
import RealTimeMinifierSeo from "@/components/seo-content/minifier-tools/real-time-minifier";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import RealTimeMinifier from "@/components/minifier-tools/real-time-minifier";

export const metadata: Metadata = {
  title: `Real-time Minifier - Live Code Compression`,
  description: `Free real-time code minifier tool. Watch as your HTML, CSS, and JS are compressed live, with instant preview and size reduction metrics as you type.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/real-time-minifier`,
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

export default function RealTimeMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Real-time Code Minifier & Preview</h1>
        <p className="text-muted-foreground">See minification results instantly as you edit. This live tool compresses your code on-the-fly, showing original and minified versions side-by-side with real-time size savings.</p>
      </header>
      {<RealTimeMinifier />}
      <div className="mt-16">
        <RealTimeMinifierSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
