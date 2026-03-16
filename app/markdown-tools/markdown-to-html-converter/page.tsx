import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import MarkdownToHtmlConverter from "@/components/markdown-tools/markdown-to-html-converter";
import MarkdownToHtmlConverterSeo from "@/components/seo-content/markdown-tools/markdown-to-html-converter";

export const metadata: Metadata = {
  title: `Markdown to HTML Converter | Free Online Tool`,
  description: `Convert Markdown to HTML online for free. Supports tables, code blocks, and live preview. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-to-html-converter`,
  },
};

const tools = [
  {
    name: `HTML to Markdown Converter`,
    description: `HTML to Markdown Converter Online`,
    href: `/markdown-tools/html-to-markdown-converter`,
  },
  {
    name: `Markdown Table Generator`,
    description: `Markdown Table Generator & Formatter`,
    href: `/markdown-tools/markdown-table-generator`,
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

export default function MarkdownToHtmlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free Markdown to HTML Converter
        </h1>
        <p className="text-muted-foreground">
          Convert your Markdown text to clean, standards-compliant HTML
          instantly. This free tool supports all common Markdown syntax and
          provides a live preview of your formatted output. Perfect for
          bloggers, developers, and content creators.
        </p>
      </header>
      <div className="mt-8">
        <MarkdownToHtmlConverter />
      </div>
      <div className="mt-8">
        <MarkdownToHtmlConverterSeo />
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
