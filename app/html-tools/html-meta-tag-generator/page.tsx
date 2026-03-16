import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlMetaTagGeneratorTool from "@/components/html-tools/html-meta-tag-generator";
import HtmlMetaTagGeneratorSEO from "@/components/seo-content/html-tools/html-meta-tag-generator";

export const metadata: Metadata = {
  title: `HTML Meta Tag Generator | SEO Meta Tags`,
  description: `Generate HTML meta tags for SEO and social media online. Create Open Graph, Twitter Cards, and standard meta tags easily.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-meta-tag-generator`,
  },
};

const tools = [
  {
    name: `HTML Formatter & Beautifier`,
    description: `Free HTML Formatter & Beautifier`,
    href: `/html-tools/html-formatter-beautifier`,
  },
  {
    name: `HTML Minifier & Compressor`,
    description: `HTML Minifier & Compressor Tool`,
    href: `/html-tools/html-minifier-compressor`,
  },
  {
    name: `HTML to PDF Converter`,
    description: `Convert HTML to PDF Online`,
    href: `/html-tools/html-to-pdf-converter`,
  },
  {
    name: `HTML Entity Encoder/Decoder`,
    description: `HTML Entity Encoder & Decoder`,
    href: `/html-tools/html-entity-encoder-decoder`,
  },
  {
    name: `HTML Table Generator`,
    description: `HTML Table Generator - Create Tables Visually`,
    href: `/html-tools/html-table-generator`,
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

export default function HtmlMetaTagGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML Meta Tag Generator for SEO
        </h1>
        <p className="text-muted-foreground">
          Generate complete sets of HTML meta tags for SEO and social sharing.
          Create Open Graph, Twitter Cards, and standard meta tags with a few
          clicks.
        </p>
      </header>
      <div className="mt-8">
        <HtmlMetaTagGeneratorTool />
      </div>
      <div className="mt-8">
        <HtmlMetaTagGeneratorSEO />
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
