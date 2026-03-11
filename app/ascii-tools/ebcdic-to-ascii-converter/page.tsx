import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import EbcdicToAsciiConverter from "@/components/ascii-tools/ebcdic-to-ascii-converter";
import EbcdicToAsciiConverterSeo from "@/components/seo-content/ascii-tools/ebcdic-to-ascii-converter";

export const metadata: Metadata = {
  title: `EBCDIC to ASCII Converter: Mainframe Code Translator`,
  description: `Free EBCDIC to ASCII converter. Translate IBM mainframe EBCDIC data to ASCII and back. Supports code pages 037, 285, 500. Perfect for legacy system migration.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ebcdic-to-ascii-converter`,
  },
};

const tools = [
  {
    name: `ASCII85 Encoder`,
    description: `ASCII85 Encoder: Base85 Binary to Text Converter`,
    href: `/ascii-tools/ascii85-encoder`,
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

export default function EbcdicToAsciiConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          EBCDIC to ASCII Converter: Mainframe Code Converter
        </h1>
        <p className="text-muted-foreground">
          Convert legacy EBCDIC data from IBM mainframes to standard ASCII
          format. Essential for mainframe migration, data integration, and
          working with COBOL systems. Supports multiple EBCDIC code pages.
        </p>
      </header>
      <div className="mt-8">
        <EbcdicToAsciiConverter />
      </div>
      <div className="mt-8">
        <EbcdicToAsciiConverterSeo />
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
