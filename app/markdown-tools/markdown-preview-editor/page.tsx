import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import MarkdownPreviewEditor from "@/components/markdown-tools/markdown-preview-editor";
import MarkdownPreviewEditorSeo from "@/components/seo-content/markdown-tools/markdown-preview-editor";

export const metadata: Metadata = {
  title: `Markdown Editor with Live Preview | Online Tool`,
  description: `Edit Markdown with a live preview pane. Supports GFM, syntax highlighting, and export. No installation needed.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-preview-editor`,
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

export default function MarkdownPreviewEditorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Live Markdown Editor with Preview
        </h1>
        <p className="text-muted-foreground">
          Write and preview your Markdown simultaneously in this live editor.
          Supports GitHub Flavored Markdown with real-time rendering. A
          essential tool for drafting documentation and README files.
        </p>
      </header>
      <div className="mt-8">
        <MarkdownPreviewEditor />
      </div>
      <div className="mt-8">
        <MarkdownPreviewEditorSeo />
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
