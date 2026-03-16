import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextReverser from "@/components/ascii-tools/text-reverser";
import TextReverserSeo from "@/components/seo-content/ascii-tools/text-reverser";

export const metadata: Metadata = {
  title: `Text Reverser: Reverse Text, Words, and Lines Online Free`,
  description: `Free text reverser tool. Reverse entire string, reverse word order, or flip text upside down. Perfect for puzzles, palindromes, and creative text effects. Easy and fast.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/text-reverser`,
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

export default function TextReverserPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text Reverser: Reverse Text, Words, and Lines Online
        </h1>
        <p className="text-muted-foreground">
          Reverse your text in multiple ways: reverse all characters, reverse
          word order, reverse each line, or flip text upside down. Perfect for
          creating mirrored text, solving puzzles, or generating creative social
          media posts.
        </p>
      </header>
      <div className="mt-8">
        <TextReverser />
      </div>
      <div className="mt-8">
        <TextReverserSeo />
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
