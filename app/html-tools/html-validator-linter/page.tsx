import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { HtmlValidatorLinter } from "@/components/html-tools/html-validator-linter";
import HtmlValidatorLinterSEO from "@/components/seo-content/html-tools/html-validator-linter";

export const metadata: Metadata = {
  title: `HTML Validator | Check HTML Errors Online`,
  description: `Validate and lint HTML code online for free. Check for syntax errors, deprecated tags, and accessibility issues with detailed feedback.`,
  alternates: {
    canonical: `https://1000freetools.com/html-tools/html-validator-linter`,
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

export default function HtmlValidatorLinterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML Validator & Linter Tool
        </h1>
        <p className="text-muted-foreground">
          Validate your HTML code for errors and compliance with web standards.
          This linter checks syntax, deprecated elements, and accessibility to
          ensure clean, correct HTML.
        </p>
      </header>
      <div className="mt-8">
        <HtmlValidatorLinter />
      </div>
      <div className="mt-8">
        <HtmlValidatorLinterSEO />
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
