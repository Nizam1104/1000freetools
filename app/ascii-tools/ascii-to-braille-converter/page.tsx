import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AsciiToBrailleConverter from "@/components/ascii-tools/ascii-to-braille-converter";
import AsciiToBrailleConverterSeo from "@/components/seo-content/ascii-tools/ascii-to-braille-converter";

export const metadata: Metadata = {
  title: `ASCII to Braille Converter: Text to Braille Translator`,
  description: `Free Braille converter. Translate ASCII text to Braille Unicode and back. Perfect for accessibility, Braille learning, and creating Braille-compatible content. Grade 1 Braille support.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii-to-braille-converter`,
  },
};

const tools = [
  {
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
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

export default function AsciiToBrailleConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ASCII to Braille Converter: Text to Braille Translator
        </h1>
        <p className="text-muted-foreground">
          Translate plain text into Braille Unicode characters and decode
          Braille back to text. Essential for accessibility tools, Braille
          education, and creating Braille-compatible content for screen readers.
        </p>
      </header>
      <div className="mt-8">
        <AsciiToBrailleConverter />
      </div>
      <div className="mt-8">
        <AsciiToBrailleConverterSeo />
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
