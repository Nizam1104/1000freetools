import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Unicode Zero-Width Tool | Hide Text Steganography`,
  description: `Hide messages in text using zero-width Unicode characters. Encode and decode invisible information for steganography. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/unicode-tools/unicode-zero-width-tool`,
  },
};

const tools = [
  {
    name: `Unicode Character Lookup`,
    description: `Unicode Character Lookup`,
    href: `/unicode-tools/unicode-character-lookup`,
  },
  {
    name: `Unicode Text Converter`,
    description: `Unicode Text Converter`,
    href: `/unicode-tools/unicode-text-converter`,
  },
  {
    name: `Unicode Character Counter`,
    description: `Unicode Character Counter`,
    href: `/unicode-tools/unicode-character-counter`,
  },
  {
    name: `Unicode Case Converter`,
    description: `Unicode Case Converter`,
    href: `/unicode-tools/unicode-case-converter`,
  },
  {
    name: `Unicode Whitespace Remover`,
    description: `Unicode Whitespace Remover`,
    href: `/unicode-tools/unicode-whitespace-remover`,
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

export default function UnicodeZeroWidthToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Unicode Zero-Width Character Tool</h1>
        <p className="text-muted-foreground">Hide secret messages in plain text using invisible zero-width Unicode characters. Encode and decode hidden information for steganography.</p>
      </header>
      {/* TODO: add tool component for unicode-zero-width-tool */}
      {/* TODO: add seo component for unicode-zero-width-tool */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
