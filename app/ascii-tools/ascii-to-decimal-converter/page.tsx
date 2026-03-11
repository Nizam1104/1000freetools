import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AsciiToDecimalConverter from "@/components/ascii-tools/ascii-to-decimal-converter";
import AsciiToDecimalConverterSeo from "@/components/seo-content/ascii-tools/ascii-to-decimal-converter";

export const metadata: Metadata = {
  title: `ASCII to Decimal Converter | Text to Base-10 Translator`,
  description: `Free ASCII to decimal converter. Convert text to decimal numbers and back. Perfect for learning ASCII codes, programming exercises, and data encoding. Includes full ASCII table.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii-to-decimal-converter`,
  },
};

const tools = [
  {
    name: `ASCII85 Encoder`,
    description: `ASCII85 Encoder: Base85 Binary to Text Converter`,
    href: `/ascii-tools/ascii85-encoder`,
  },
  {
    name: `EBCDIC to ASCII Converter`,
    description: `EBCDIC to ASCII Converter: Mainframe Code Converter`,
    href: `/ascii-tools/ebcdic-to-ascii-converter`,
  },
  {
    name: `Text Differ`,
    description: `Text Differ: Compare Text and Find Differences`,
    href: `/ascii-tools/text-differ`,
  },
  {
    name: `Leet Speak Converter`,
    description: `Leet Speak Converter: Convert Text to 1337 Online`,
    href: `/ascii-tools/leet-speak-converter`,
  },
  {
    name: `Text to Morse Code`,
    description: `Text to Morse Code: Morse Code Translator Online`,
    href: `/ascii-tools/text-to-morse-code`,
  },
  {
    name: `TOML to JSON Converter`,
    description: `Convert TOML to JSON Instantly`,
    href: `/toml-tools/toml-to-json-converter`,
  },
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `YAML Validator`,
    description: `Free Online YAML Validator`,
    href: `/yaml-tools/yaml-validator`,
  },
];

export default function AsciiToDecimalConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ASCII to Decimal Converter: Text to Decimal Numbers
        </h1>
        <p className="text-muted-foreground">
          Translate ASCII text to decimal numbers instantly. See the numeric
          representation of every character, from basic Latin letters to control
          codes. Essential for computer science education and low-level
          programming.
        </p>
      </header>
      <div className="mt-8">
        <AsciiToDecimalConverter />
      </div>
      <div className="mt-8">
        <AsciiToDecimalConverterSeo />
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
