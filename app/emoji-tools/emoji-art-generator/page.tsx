import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import EmojiArtGenerator from "@/components/emoji-tools/emoji-art-generator";
import EmojiArtGeneratorSeo from "@/components/seo-content/emoji-tools/emoji-art-generator";

export const metadata: Metadata = {
  title: `Emoji Art Generator | Create Pictures from Emojis`,
  description: `Generate emoji art from text or images. Make portraits, logos, and big text using emoji mosaics. Free online emoji art creator.`,
  alternates: {
    canonical: `https://1000freetools.com/emoji-tools/emoji-art-generator`,
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

export default function EmojiArtGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Emoji Art & Picture Generator
        </h1>
        <p className="text-muted-foreground">
          Turn any text or image into emoji art. Create portraits, logos, or
          large messages using hundreds of emojis. Customize your palette and
          share your emoji masterpiece.
        </p>
      </header>
      <div className="mt-8">
        <EmojiArtGenerator />
      </div>
      <div className="mt-8">
        <EmojiArtGeneratorSeo />
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
