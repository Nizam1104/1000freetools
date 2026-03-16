import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `UTF-8 Validator: Check UTF-8 Encoding Online Free`,
  description: `Free UTF-8 validator tool. Check for invalid UTF-8 sequences, overlong encodings, and non-characters. Perfect for debugging encoding issues in web apps and data files.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/utf8-validator`,
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

export default function Utf8ValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UTF-8 Validator: Check and Validate UTF-8 Encoding</h1>
        <p className="text-muted-foreground">Validate UTF-8 encoded text and detect common encoding errors. Analyzes byte sequences, identifies invalid characters, and shows code point details. Essential for debugging character encoding problems in web applications and data processing.</p>
      </header>
      {/* TODO: add tool component for utf8-validator */}
      {/* TODO: add seo component for utf8-validator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
