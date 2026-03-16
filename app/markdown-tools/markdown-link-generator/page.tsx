import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Markdown Link Generator | Create Link Syntax`,
  description: `Generate Markdown link code ([text](url)) quickly. Includes reference-style links and URL validation. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-link-generator`,
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

export default function MarkdownLinkGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Markdown Link Syntax Generator</h1>
        <p className="text-muted-foreground">Generate Markdown link code instantly. Input your URL and link text for perfect syntax every time. Also create reference-style links and validate URLs.</p>
      </header>
      {/* TODO: add tool component for markdown-link-generator */}
      {/* TODO: add seo component for markdown-link-generator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
