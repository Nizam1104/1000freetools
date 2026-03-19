import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { MarkdownToWordpressHtmlConverter } from "@/components/markdown-tools/markdown-to-wordpress-html-converter";
import MarkdownToWordpressHtmlConverterSeo from "@/components/seo-content/markdown-tools/markdown-to-wordpress-html-converter";

export const metadata: Metadata = {
  title: `Markdown to WordPress HTML | Converter Tool`,
  description: `Convert Markdown to WordPress-compatible HTML. Optimized for Gutenberg editor. Free online converter.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-to-wordpress-html-converter`,
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

export default function MarkdownToWordpressHtmlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Markdown to WordPress HTML Converter</h1>
        <p className="text-muted-foreground">Convert your Markdown articles to WordPress-ready HTML. This tool produces clean code compatible with the block editor, making publishing faster.</p>
      </header>
      {<MarkdownToWordpressHtmlConverter />}
      <MarkdownToWordpressHtmlConverterSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
