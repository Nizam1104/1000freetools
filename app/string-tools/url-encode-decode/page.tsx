import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlEncodeDecode from "@/components/string-tools/url-encode-decode";
import UrlEncodeDecodeSeo from "@/components/seo-content/string-tools/url-encode-decode";

export const metadata: Metadata = {
  title: `URL Encoder / Decoder - Percent Encoding Tool Online`,
  description: `Free online URL encoder and decoder. Percent-encode strings for URLs or decode them back to original text. Handles special characters and Unicode.`,
  alternates: {
    canonical: `https://1000freetools.com/string-tools/url-encode-decode`,
  },
};

const tools = [
  {
    name: `Text Case Converter`,
    description: `Free Text Case Converter Tool`,
    href: `/string-tools/text-case-converter`,
  },
  {
    name: `Word Counter & Character Counter`,
    description: `Word Counter & Character Counter Tool`,
    href: `/string-tools/word-counter-character-counter`,
  },
  {
    name: `String Reverse Tool`,
    description: `Reverse Text & String Online Tool`,
    href: `/string-tools/string-reverse`,
  },
  {
    name: `Text Compare & Diff Checker`,
    description: `Text Compare & Difference Checker`,
    href: `/string-tools/text-compare-diff-checker`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
  {
    name: `CRON Expression Generator`,
    description: `Free CRON Expression Generator`,
    href: `/cron-expression-tools/cron-expression-generator`,
  },
];

export default function UrlEncodeDecodePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">URL Encoder & Decoder Tool</h1>
        <p className="text-muted-foreground">
          Encode text for safe use in URLs or decode URL-encoded strings. This
          free tool percent-encodes special characters like spaces, ampersands,
          and Unicode. Essential for web developers and SEOs.
        </p>
      </header>
      <div className="mt-8">
        <UrlEncodeDecode />
      </div>
      <div className="mt-8">
        <UrlEncodeDecodeSeo />
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
