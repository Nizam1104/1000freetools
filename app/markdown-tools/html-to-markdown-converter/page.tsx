import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HtmlToMarkdownConverter from "@/components/markdown-tools/html-to-markdown-converter";
import HtmlToMarkdownConverterSeo from "@/components/seo-content/markdown-tools/html-to-markdown-converter";

export const metadata: Metadata = {
  title: `HTML to Markdown Converter | Free Online Tool`,
  description: `Convert HTML to Markdown format online. Handles links, images, lists, and tables. Quick and accurate conversion.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/html-to-markdown-converter`,
  },
};

const tools = [
  {
    name: `Markdown to HTML Converter`,
    description: `Free Markdown to HTML Converter`,
    href: `/markdown-tools/markdown-to-html-converter`,
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

export default function HtmlToMarkdownConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          HTML to Markdown Converter Online
        </h1>
        <p className="text-muted-foreground">
          Easily transform your HTML code into clean, readable Markdown. This
          tool accurately converts headings, links, lists, and images. Ideal for
          developers and writers moving content to Markdown-based platforms.
        </p>
      </header>
      <div className="mt-8">
        <HtmlToMarkdownConverter />
      </div>
      <div className="mt-8">
        <HtmlToMarkdownConverterSeo />
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
