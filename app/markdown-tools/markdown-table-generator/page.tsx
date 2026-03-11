import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import MarkdownTableGenerator from "@/components/markdown-tools/markdown-table-generator";
import MarkdownTableGeneratorSeo from "@/components/seo-content/markdown-tools/markdown-table-generator";

export const metadata: Metadata = {
  title: `Markdown Table Generator | Create Tables Online`,
  description: `Create and format Markdown tables with a visual editor. Import CSV, adjust alignment, and generate clean syntax instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-table-generator`,
  },
};

const tools = [
  {
    name: `Markdown to HTML Converter`,
    description: `Free Markdown to HTML Converter`,
    href: `/markdown-tools/markdown-to-html-converter`,
  },
  {
    name: `HTML to Markdown Converter`,
    description: `HTML to Markdown Converter Online`,
    href: `/markdown-tools/html-to-markdown-converter`,
  },
  {
    name: `Markdown Preview Editor`,
    description: `Live Markdown Editor with Preview`,
    href: `/markdown-tools/markdown-preview-editor`,
  },
  {
    name: `Markdown Cheat Sheet Generator`,
    description: `Create a Custom Markdown Cheat Sheet`,
    href: `/markdown-tools/markdown-cheat-sheet-generator`,
  },
  {
    name: `Markdown Link Generator`,
    description: `Markdown Link Syntax Generator`,
    href: `/markdown-tools/markdown-link-generator`,
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

export default function MarkdownTableGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Markdown Table Generator & Formatter
        </h1>
        <p className="text-muted-foreground">
          Build and format Markdown tables effortlessly with our visual editor.
          Adjust alignment, add rows, and copy the generated syntax. Also import
          CSV data or clean up existing Markdown tables.
        </p>
      </header>
      <div className="mt-8">
        <MarkdownTableGenerator />
      </div>
      <div className="mt-8">
        <MarkdownTableGeneratorSeo />
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
