import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `UTF-8 to UTF-16 Converter: Unicode Encoding Converter`,
  description: `Free UTF-8 to UTF-16 converter. Convert between Unicode encodings with endianness options (LE/BE). Perfect for Windows programming, Java, and cross-platform development.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/utf8-to-utf16-converter`,
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

export default function Utf8ToUtf16ConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UTF-8 to UTF-16 Converter: Unicode Encoding Tool</h1>
        <p className="text-muted-foreground">Convert text between UTF-8 and UTF-16 encodings with byte-level visibility. Choose between little-endian and big-endian for UTF-16. Essential for Windows development, Java applications, and cross-platform data exchange.</p>
      </header>
      {/* TODO: add tool component for utf8-to-utf16-converter */}
      {/* TODO: add seo component for utf8-to-utf16-converter */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
