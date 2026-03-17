import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlTableGeneratorTool from "@/components/html-tools/html-table-generator";
import HtmlTableGeneratorSEO from "@/components/seo-content/html-tools/html-table-generator";

export const metadata: Metadata = {
  title: `HTML Table Generator | Free Visual Tool`,
  description: `Create HTML tables visually with this free online generator. Design tables with rows, columns, and styles, then get the HTML code instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-table-generator`,
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

export default function HtmlTableGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML Table Generator - Create Tables Visually
        </h1>
        <p className="text-muted-foreground">
          Generate HTML table code quickly with our visual table builder. No
          coding required—define rows, columns, and styles, then copy the clean
          HTML output.
        </p>
      </header>
      <div className="mt-8">
        <HtmlTableGeneratorTool />
      </div>
      <div className="mt-8">
        <HtmlTableGeneratorSEO />
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
