import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlFormatterBeautifierTool from "@/components/html-tools/html-formatter-beautifier";
import HtmlFormatterBeautifierSEO from "@/components/seo-content/html-tools/html-formatter-beautifier";

export const metadata: Metadata = {
  title: `HTML Formatter & Beautifier | Free Online Tool`,
  description: `Format and beautify your HTML code online for free. Clean up minified HTML with proper indentation, line breaks, and syntax highlighting instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-formatter-beautifier`,
  },
};

const tools = [
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
    name: `HTML Validator & Linter`,
    description: `HTML Validator & Linter Tool`,
    href: `/html-tools/html-validator-linter`,
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

export default function HtmlFormatterBeautifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free HTML Formatter & Beautifier
        </h1>
        <p className="text-muted-foreground">
          Clean up and beautify your messy HTML code instantly. This free tool
          formats minified or unreadable HTML with proper indentation and line
          breaks, making it easier to read and debug. Perfect for developers and
          designers.
        </p>
      </header>
      <div className="mt-8">
        <HtmlFormatterBeautifierTool />
      </div>
      <div className="mt-8">
        <HtmlFormatterBeautifierSEO />
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
