import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextToHexConverter from "@/components/hex-tools/text-to-hex-converter";
import TextToHexConverterSeo from "@/components/seo-content/hex-tools/text-to-hex-converter";

export const metadata: Metadata = {
  title: `Text to Hex Converter | Free String to Hexadecimal Tool`,
  description: `Convert text to hex code online. Supports Unicode, customizable formatting. Fast, free tool for encoding and data representation.`,
  alternates: {
    canonical: `https://1000freetools.com/hex-tools/text-to-hex-converter`,
  },
};

const tools = [
  {
    name: `Hex to Text Converter`,
    description: `Free Hex to Text Converter Online`,
    href: `/hex-tools/hex-to-text-converter`,
  },
  {
    name: `Hex to Decimal Converter`,
    description: `Hex to Decimal Converter Tool`,
    href: `/hex-tools/hex-to-decimal-converter`,
  },
  {
    name: `Decimal to Hex Converter`,
    description: `Decimal to Hex Converter Online`,
    href: `/hex-tools/decimal-to-hex-converter`,
  },
  {
    name: `Hex to Binary Converter`,
    description: `Hex to Binary Converter Online`,
    href: `/hex-tools/hex-to-binary-converter`,
  },
  {
    name: `Binary to Hex Converter`,
    description: `Binary to Hex Converter Tool`,
    href: `/hex-tools/binary-to-hex-converter`,
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
];

export default function TextToHexConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text to Hex Converter Online
        </h1>
        <p className="text-muted-foreground">
          Transform any text or string into its hexadecimal equivalent quickly.
          Our converter handles Unicode and offers customizable formatting.
          Essential for encoding data, debugging, and network programming tasks.
        </p>
      </header>
      <div className="mt-8">
        <TextToHexConverter />
      </div>
      <div className="mt-8">
        <TextToHexConverterSeo />
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
