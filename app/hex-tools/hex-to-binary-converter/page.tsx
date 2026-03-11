import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HexToBinaryConverter from "@/components/hex-tools/hex-to-binary-converter";
import HexToBinaryConverterSeo from "@/components/seo-content/hex-tools/hex-to-binary-converter";

export const metadata: Metadata = {
  title: `Hex to Binary Converter | Free Online Translator`,
  description: `Convert hex to binary quickly. Output grouped by nibbles. Free, simple tool for students and hardware developers.`,
  alternates: {
    canonical: `https://1000freetools.com/hex-tools/hex-to-binary-converter`,
  },
};

const tools = [
  {
    name: `Hex to Text Converter`,
    description: `Free Hex to Text Converter Online`,
    href: `/hex-tools/hex-to-text-converter`,
  },
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

export default function HexToBinaryConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Hex to Binary Converter Online
        </h1>
        <p className="text-muted-foreground">
          Convert hexadecimal values to binary strings instantly. See each hex
          digit expanded to 4 bits. Ideal for understanding bitwise operations,
          assembly language, and digital logic design.
        </p>
      </header>
      <div className="mt-8">
        <HexToBinaryConverter />
      </div>
      <div className="mt-8">
        <HexToBinaryConverterSeo />
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
