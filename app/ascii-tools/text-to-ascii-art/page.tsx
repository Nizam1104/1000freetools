import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextToAsciiArt from "@/components/ascii-tools/text-to-ascii-art";
import TextToAsciiArtSeo from "@/components/seo-content/ascii-tools/text-to-ascii-art";

export const metadata: Metadata = {
  title: `Text to ASCII Art: ASCII Banner Generator Online Free`,
  description: `Free ASCII art generator from text. Create ASCII banners with 50+ FIGlet fonts. Perfect for terminal headers, code comments, retro designs, and creative projects. Copy and paste ready.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/text-to-ascii-art`,
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

export default function TextToAsciiArtPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text to ASCII Art: Create ASCII Text Banners Online
        </h1>
        <p className="text-muted-foreground">
          Turn any word or phrase into eye-catching ASCII art banners. Choose
          from 50+ FIGlet fonts including standard, shadow, bubble, and graffiti
          styles. Perfect for terminal applications, code comments, and retro
          gaming projects.
        </p>
      </header>
      <div className="mt-8">
        <TextToAsciiArt />
      </div>
      <div className="mt-8">
        <TextToAsciiArtSeo />
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
