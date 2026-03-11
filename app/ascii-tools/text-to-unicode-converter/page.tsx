import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextToUnicodeConverter from "@/components/ascii-tools/text-to-unicode-converter";
import TextToUnicodeConverterSeo from "@/components/seo-content/ascii-tools/text-to-unicode-converter";

export const metadata: Metadata = {
  title: `Text to Unicode Converter: Unicode Code Point Translator`,
  description: `Free Unicode converter. Translate text to Unicode code points (hex/decimal) and back. Supports emojis, multilingual text, and UTF-8/UTF-16 encoding. Essential for i18n development.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/text-to-unicode-converter`,
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
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
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
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
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
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
];

export default function TextToUnicodeConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text to Unicode Converter: Unicode Code Point Translator
        </h1>
        <p className="text-muted-foreground">
          Convert any text to Unicode code points and back. Perfect for
          developers working with internationalization, emoji handling, or text
          encoding. View UTF-8 and UTF-16 representations for every character.
        </p>
      </header>
      <div className="mt-8">
        <TextToUnicodeConverter />
      </div>
      <div className="mt-8">
        <TextToUnicodeConverterSeo />
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
