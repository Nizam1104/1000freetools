import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HexToDecimalConverter from "@/components/hex-tools/hex-to-decimal-converter";
import HexToDecimalConverterSeo from "@/components/seo-content/hex-tools/hex-to-decimal-converter";

export const metadata: Metadata = {
  title: `Hex to Decimal Converter | Free Online Calculator`,
  description: `Convert hex numbers to decimal instantly. Handles two's complement, large numbers. Free, detailed calculator for students and engineers.`,
  alternates: {
    canonical: `https://1000freetools.com/hex-tools/hex-to-decimal-converter`,
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

export default function HexToDecimalConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Hex to Decimal Converter Tool
        </h1>
        <p className="text-muted-foreground">
          Accurately convert hexadecimal numbers to decimal format. Our tool
          explains the conversion process and handles large values. Useful for
          computer science, digital electronics, and programming calculations.
        </p>
      </header>
      <div className="mt-8">
        <HexToDecimalConverter />
      </div>
      <div className="mt-8">
        <HexToDecimalConverterSeo />
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
