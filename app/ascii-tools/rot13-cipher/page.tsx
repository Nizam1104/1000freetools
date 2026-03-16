import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Rot13Cipher from "@/components/ascii-tools/rot13-cipher";
import Rot13CipherSeo from "@/components/seo-content/ascii-tools/rot13-cipher";

export const metadata: Metadata = {
  title: `ROT13 Cipher: Encode and Decode ROT13 Online Free`,
  description: `Free ROT13 cipher tool. Apply rotate-by-13 substitution to any text. Perfect for spoilers, puzzles, and basic obfuscation. Same tool encodes and decodes automatically.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/rot13-cipher`,
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

export default function Rot13CipherPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ROT13 Cipher: Rotate Text by 13 Letters Online
        </h1>
        <p className="text-muted-foreground">
          Apply the ROT13 cipher to any text - a simple letter substitution that
          rotates A-Z by 13 positions. Perfect for hiding spoilers, creating
          puzzles, or basic text obfuscation. The same tool encodes and decodes.
        </p>
      </header>
      <div className="mt-8">
        <Rot13Cipher />
      </div>
      <div className="mt-8">
        <Rot13CipherSeo />
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
