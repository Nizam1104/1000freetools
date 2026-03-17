import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlCommentRemoverExtractorTool from "@/components/html-tools/html-comment-remover-extractor";
import HtmlCommentRemoverExtractorSEO from "@/components/seo-content/html-tools/html-comment-remover-extractor";

export const metadata: Metadata = {
  title: `HTML Comment Remover | Strip Comments Online`,
  description: `Remove or extract HTML comments from your code online. Clean production files or review developer notes with this free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-comment-remover-extractor`,
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

export default function HtmlCommentRemoverExtractorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML Comment Remover & Extractor
        </h1>
        <p className="text-muted-foreground">
          Strip HTML comments from your code to clean files for production, or
          extract comments to review notes. Handles standard and conditional
          comments.
        </p>
      </header>
      <div className="mt-8">
        <HtmlCommentRemoverExtractorTool />
      </div>
      <div className="mt-8">
        <HtmlCommentRemoverExtractorSEO />
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
