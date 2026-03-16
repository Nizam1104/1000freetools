import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import LeetSpeakConverter from "@/components/ascii-tools/leet-speak-converter";
import LeetSpeakConverterSeo from "@/components/seo-content/ascii-tools/leet-speak-converter";

export const metadata: Metadata = {
  title: `Leet Speak Converter: 1337 Translator Online Free`,
  description: `Free leet speak (1337) converter. Transform text with basic to extreme character substitutions. Perfect for gaming handles, usernames, and retro internet style. Multiple leet levels.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/leet-speak-converter`,
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

export default function LeetSpeakConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Leet Speak Converter: Convert Text to 1337 Online
        </h1>
        <p className="text-muted-foreground">
          Transform plain text into leet speak (1337) with adjustable intensity.
          Choose from basic substitutions (A→4, E→3) to extreme leet with mixed
          case and symbols. Perfect for creating unique gaming usernames and
          embracing retro internet culture.
        </p>
      </header>
      <div className="mt-8">
        <LeetSpeakConverter />
      </div>
      <div className="mt-8">
        <LeetSpeakConverterSeo />
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
