import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { MarkdownToNotionConverter } from "@/components/markdown-tools/markdown-to-notion-converter.tsx";
import MarkdownToNotionConverterSeo from "@/components/seo-content/markdown-tools/markdown-to-notion-converter";

export const metadata: Metadata = {
  title: `Markdown to Notion Converter | Format for Notion`,
  description: `Convert Markdown to Notion-compatible formatting. Preserve headers, lists, and code when pasting. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-to-notion-converter`,
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

export default function MarkdownToNotionConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Markdown to Notion Format Converter</h1>
        <p className="text-muted-foreground">Prepare your Markdown content for pasting into Notion. This tool converts formatting to be Notion-friendly, preserving lists, headers, and code. Simplify your content migration.</p>
      </header>
      {<MarkdownToNotionConverter />}
      <MarkdownToNotionConverterSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
