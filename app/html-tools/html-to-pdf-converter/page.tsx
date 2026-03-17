import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlToPdfConverterTool from "@/components/html-tools/html-to-pdf-converter";
import HtmlToPdfConverterSEO from "@/components/seo-content/html-tools/html-to-pdf-converter";

export const metadata: Metadata = {
  title: `HTML to PDF Converter | Free Online Tool`,
  description: `Convert HTML code or webpages to PDF online for free. Generate PDFs from HTML with preserved styling, images, and layout.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-to-pdf-converter`,
  },
};

const tools = [
  {
    name: `HTML Formatter & Beautifier`,
    description: `Free HTML Formatter & Beautifier`,
    href: `/html-tools/html-formatter-beautifier`,
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

export default function HtmlToPdfConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert HTML to PDF Online</h1>
        <p className="text-muted-foreground">
          Easily convert your HTML code or any webpage URL into a downloadable
          PDF document. This tool preserves layouts, styles, and images for
          accurate PDF generation.
        </p>
      </header>
      <div className="mt-8">
        <HtmlToPdfConverterTool />
      </div>
      <div className="mt-8">
        <HtmlToPdfConverterSEO />
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
