import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HexToTextConverter from "@/components/hex-tools/hex-to-text-converter";
import HexToTextConverterSeo from "@/components/seo-content/hex-tools/hex-to-text-converter";

export const metadata: Metadata = {
  title: `Hex to Text Converter | Free Online Tool`,
  description: `Instantly convert hex codes to readable text. Supports UTF-8, ASCII. No signup required. Fast, accurate, and free for developers.`,
  alternates: {
    canonical: `https://1000freetools.com/hex-tools/hex-to-text-converter`,
  },
};

const tools = [
  {
    name: `Text to Hex Converter`,
    description: `Text to Hex Converter Online`,
    href: `/hex-tools/text-to-hex-converter`,
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

export default function HexToTextConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free Hex to Text Converter Online
        </h1>
        <p className="text-muted-foreground">
          Convert any hexadecimal code back into human-readable text instantly.
          Our tool supports multiple encodings and validates your input for
          accuracy. Perfect for developers, reverse engineers, and students
          working with low-level data.
        </p>
      </header>
      <div className="mt-8">
        <HexToTextConverter />
      </div>
      <div className="mt-8">
        <HexToTextConverterSeo />
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
