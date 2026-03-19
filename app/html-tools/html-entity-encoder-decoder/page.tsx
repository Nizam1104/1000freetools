import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { HtmlEntityEncoderDecoder } from "@/components/html-tools/html-entity-encoder-decoder";
import HtmlEntityEncoderDecoderSEO from "@/components/seo-content/html-tools/html-entity-encoder-decoder";

export const metadata: Metadata = {
  title: `HTML Entity Encoder/Decoder | Free Online Tool`,
  description: `Encode text to HTML entities or decode entities to text online. Safely display special characters in HTML with this free encoder/decoder tool.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-entity-encoder-decoder`,
  },
};

const tools = [
  {
    name: `HTML Formatter & Beautifier`,
    description: `Free HTML Formatter & Beautifier`,
    href: `/html-tools/html-formatter-beautifier`,
  },
  {
    name: `HTML to PDF Converter`,
    description: `Convert HTML to PDF Online`,
    href: `/html-tools/html-to-pdf-converter`,
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

export default function HtmlEntityEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML Entity Encoder & Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode special characters to HTML entities for safe web display, or
          decode entities back to plain text. This tool handles all standard
          named and numeric HTML entities.
        </p>
      </header>
      <div className="mt-8">
        <HtmlEntityEncoderDecoder />
      </div>
      <div className="mt-8">
        <HtmlEntityEncoderDecoderSEO />
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
