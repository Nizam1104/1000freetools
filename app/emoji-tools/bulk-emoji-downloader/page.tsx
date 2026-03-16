import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Bulk Download Emojis | Get Emoji Packs as PNG/SVG`,
  description: `Download full emoji sets in bulk. Get ZIP files with PNG/SVG emojis by category, size, and skin tone. Free for personal and commercial use.`,
  alternates: {
    canonical: `https://1000freetools.com/emoji-tools/bulk-emoji-downloader`,
  },
};

const tools = [
  {
    name: `Emoji Picker & Copy Paste`,
    description: `Emoji Picker & Copy Tool`,
    href: `/emoji-tools/emoji-picker-copy-paste`,
  },
  {
    name: `Emoji Translator & Meaning Finder`,
    description: `Emoji Meaning & Translator`,
    href: `/emoji-tools/emoji-translator-meaning`,
  },
  {
    name: `Emoji Combiner & Mixer`,
    description: `Combine & Mix Emojis`,
    href: `/emoji-tools/emoji-combiner-mixer`,
  },
  {
    name: `Emoji Art Generator & Text to Emoji`,
    description: `Emoji Art & Picture Generator`,
    href: `/emoji-tools/emoji-art-generator`,
  },
  {
    name: `Emoji Kitchen - Create Mashups`,
    description: `Emoji Kitchen Mashup Maker`,
    href: `/emoji-tools/emoji-kitchen-mashup`,
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

export default function BulkEmojiDownloaderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bulk Emoji Downloader & Icon Pack</h1>
        <p className="text-muted-foreground">Download entire emoji sets as PNG or SVG files. Get all smileys, animals, or flags in one ZIP. Choose sizes and skin tones for your design or development projects.</p>
      </header>
      {/* TODO: add tool component for bulk-emoji-downloader */}
      {/* TODO: add seo component for bulk-emoji-downloader */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
