import type { Metadata } from "next";
import FontOcrExtractorSeo from "@/components/seo-content/font-tools/font-ocr-extractor";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontIdentifier from "@/components/font-tools/font-identifier";

export const metadata: Metadata = {
  title: `Font OCR Tool | Extract Text with Formatting`,
  description: `Extract text from images with font styles preserved. OCR tool that recognizes typography. Free online text extraction.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-ocr-extractor`,
  },
};

const tools = [
  {
    name: `Font Generator`,
    description: `Free Font Generator`,
    href: `/font-tools/font-generator`,
  },
  {
    name: `Font Identifier`,
    description: `What Font Is This?`,
    href: `/font-tools/font-identifier`,
  },
  {
    name: `Font Converter`,
    description: `Font File Converter`,
    href: `/font-tools/font-converter`,
  },
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Generator`,
    href: `/font-tools/font-pairing`,
  },
  {
    name: `Font Size Calculator`,
    description: ``,
    href: `/font-tools/font-size-calculator`,
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

export default function FontOcrExtractorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Extract Text with Font Styles</h1>
        <p className="text-muted-foreground">Copy text from images and keep the font styling. Our OCR tool recognizes fonts and formatting for accurate extraction.</p>
      </header>
      <div className="mt-8">
        <FontIdentifier />
      </div>
      <div className="mt-16">
        <FontOcrExtractorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
