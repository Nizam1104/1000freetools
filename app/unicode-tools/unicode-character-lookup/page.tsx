import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UnicodeCharacterLookup from "@/components/unicode-tools/unicode-character-lookup";
import UnicodeCharacterLookupSeo from "@/components/seo-content/unicode-tools/unicode-character-lookup";

export const metadata: Metadata = {
  title: `Unicode Character Lookup Tool | Find Any Character`,
  description: `Look up any Unicode character by name, code point, or description. Get HTML entities, UTF-8 encoding, and copy characters instantly. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/unicode-tools/unicode-character-lookup`,
  },
};

const tools = [
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
    name: `Unicode Regex Tester`,
    description: `Unicode Regex Tester`,
    href: `/unicode-tools/unicode-regex-tester`,
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

export default function UnicodeCharacterLookupPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Unicode Character Lookup</h1>
        <p className="text-muted-foreground">
          Find any Unicode character instantly. Search by name, code point, or
          description to get full details, encodings, and copy the character
          with one click.
        </p>
      </header>
      <div className="mt-8">
        <UnicodeCharacterLookup />
      </div>
      <div className="mt-8">
        <UnicodeCharacterLookupSeo />
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
