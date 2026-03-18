import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Emoji Mashup Maker | Create Fun Emoji Combos Online`,
  description: `Make custom emoji mashups and stickers. Combine two emojis like fire and heart to create new designs. Free online emoji kitchen tool.`,
  alternates: {
    canonical: `https://1000freetools.com/emoji-tools/emoji-kitchen-mashup`,
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

import EmojiKitchenMashup from "@/components/emoji-tools/emoji-kitchen-mashup"
import EmojiKitchenMashupSeo from "@/components/seo-content/emoji-tools/emoji-kitchen-mashup"

export default function EmojiKitchenMashupPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Emoji Kitchen Mashup Maker</h1>
        <p className="text-muted-foreground">Mix two emojis to create fun sticker mashups, like a laughing poop or a cowboy ghost. Generate and download unique emoji combinations for messages and social media.</p>
      </header>
      <EmojiKitchenMashup />
      <div className="mt-8">
        <EmojiKitchenMashupSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
