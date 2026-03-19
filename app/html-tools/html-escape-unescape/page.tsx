import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { HtmlEscapeUnescape } from "@/components/html-tools/html-escape-unescape";
import HtmlEscapeUnescapeSEO from "@/components/seo-content/html-tools/html-escape-unescape";

export const metadata: Metadata = {
  title: `HTML Escape Tool | Escape/Unescape Characters`,
  description: `Escape or unescape HTML special characters online. Safely encode <, >, &, quotes for HTML display, or decode them back.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-escape-unescape`,
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

export default function HtmlEscapeUnescapePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">HTML Escape & Unescape Tool</h1>
        <p className="text-muted-foreground">
          Escape HTML special characters to prevent XSS and display code safely,
          or unescape strings back to their original form. A must-have for web
          developers.
        </p>
      </header>
      <div className="mt-8">
        <HtmlEscapeUnescape />
      </div>
      <div className="mt-8">
        <HtmlEscapeUnescapeSEO />
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
