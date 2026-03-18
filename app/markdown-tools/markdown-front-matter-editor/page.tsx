import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { MarkdownFrontMatterEditor } from "@/components/markdown-tools/markdown-front-matter-editor.tsx";
import MarkdownFrontMatterEditorSeo from "@/components/seo-content/markdown-tools/markdown-front-matter-editor";

export const metadata: Metadata = {
  title: `Markdown Front Matter Editor | YAML/TOML Tool`,
  description: `Edit front matter metadata in Markdown files. Supports YAML and TOML for Jekyll, Hugo. Free online editor.`,
  alternates: {
    canonical: `https://1000freetools.com/markdown-tools/markdown-front-matter-editor`,
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

export default function MarkdownFrontMatterEditorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Markdown Front Matter Metadata Editor</h1>
        <p className="text-muted-foreground">Edit the YAML or TOML front matter in your Markdown files easily. Update titles, dates, tags, and custom fields for static site generators.</p>
      </header>
      {<MarkdownFrontMatterEditor />}
      <MarkdownFrontMatterEditorSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
