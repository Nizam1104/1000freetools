import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlEmailTemplateBuilder from "@/components/html-tools/html-email-template-builder";
import HtmlEmailTemplateBuilderSEO from "@/components/seo-content/html-tools/html-email-template-builder";

export const metadata: Metadata = {
  title: `HTML Email Template Builder | Free Online`,
  description: `Build responsive HTML email templates online with a drag-and-drop editor. Create newsletters compatible with Gmail, Outlook, and more.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-email-template-builder`,
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

export default function HtmlEmailTemplateBuilderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML Email Template Builder & Designer
        </h1>
        <p className="text-muted-foreground">
          Design responsive HTML email templates with a drag-and-drop editor.
          Create newsletters and campaigns that work across all major email
          clients.
        </p>
      </header>
      <div className="mt-8">
        <HtmlEmailTemplateBuilder />
      </div>
      <div className="mt-8">
        <HtmlEmailTemplateBuilderSEO />
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
