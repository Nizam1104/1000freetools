import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Emoji Meanings & Translator | What Does This Emoji Mean?`,
  description: `Decode any emoji's meaning. Get official names, slang interpretations, and usage examples. Free online emoji translator and meaning finder.`,
  alternates: {
    canonical: `https://1000freetools.com/emoji-tools/emoji-translator-meaning`,
  },
};

const tools = [
  {
    name: `Emoji Picker & Copy Paste`,
    description: `Emoji Picker & Copy Tool`,
    href: `/emoji-tools/emoji-picker-copy-paste`,
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
    name: `Emoji to Text Converter & Translator`,
    description: `Emoji to Text Converter`,
    href: `/emoji-tools/emoji-to-text-converter`,
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

export default function EmojiTranslatorMeaningPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Emoji Meaning & Translator</h1>
        <p className="text-muted-foreground">Not sure what an emoji means? Use our translator to get the official definition and real-world usage. Learn the slang, cultural context, and platform differences for any emoji.</p>
      </header>
      {/* TODO: add tool component for emoji-translator-meaning */}
      {/* TODO: add seo component for emoji-translator-meaning */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
