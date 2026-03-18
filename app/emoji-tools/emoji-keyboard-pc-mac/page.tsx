import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import EmojiKeyboardPcMacSeo from "@/components/seo-content/emoji-tools/emoji-keyboard-pc-mac";

export const metadata: Metadata = {
  title: `Emoji Keyboard for PC & Mac | Type Emojis on Computer`,
  description: `Type emojis on your computer with our free virtual keyboard. Click to insert emojis into any app or website. Works on Windows and Mac.`,
  alternates: {
    canonical: `https://1000freetools.com/emoji-tools/emoji-keyboard-pc-mac`,
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

import EmojiKeyboardPcMac from "@/components/emoji-tools/emoji-keyboard-pc-mac"

export default function EmojiKeyboardPcMacPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Emoji Keyboard for Computer</h1>
        <p className="text-muted-foreground">Use emojis easily on your PC or Mac. Our virtual keyboard lets you click to insert emojis into any app, website, or document. No special software needed.</p>
      </header>
      <EmojiKeyboardPcMac />
      <div className="mt-8">
        <EmojiKeyboardPcMacSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
