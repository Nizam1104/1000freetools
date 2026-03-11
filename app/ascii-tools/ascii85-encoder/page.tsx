import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Ascii85Encoder from "@/components/ascii-tools/ascii85-encoder";
import Ascii85EncoderSeo from "@/components/seo-content/ascii-tools/ascii85-encoder";

export const metadata: Metadata = {
  title: `ASCII85 Encoder: Base85 Binary to Text Converter Online`,
  description: `Free ASCII85 (Base85) encoder and decoder. Convert binary data to ASCII85 for PDF and PostScript. Supports standard ASCII85, Z85, and RFC 1924 variants.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii85-encoder`,
  },
};

const tools = [
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

export default function Ascii85EncoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ASCII85 Encoder: Base85 Binary to Text Converter
        </h1>
        <p className="text-muted-foreground">
          Convert binary data to ASCII85 (Base85) text encoding and decode back.
          Essential for working with PDF files, PostScript, and binary data in
          text protocols. Supports multiple ASCII85 variants including Z85.
        </p>
      </header>
      <div className="mt-8">
        <Ascii85Encoder />
      </div>
      <div className="mt-8">
        <Ascii85EncoderSeo />
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
