import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { HexToFloatDoubleConverter } from "@/components/hex-tools/hex-to-float-double-converter.tsx";
import HexToFloatDoubleConverterSeo from "@/components/seo-content/hex-tools/hex-to-float-double-converter";

export const metadata: Metadata = {
  title: `Hex to Float Converter | IEEE 754 Online Tool`,
  description: `Convert hex to float/double per IEEE 754. See bit breakdown. Free, advanced tool for developers and engineers.`,
  alternates: {
    canonical: `https://1000freetools.com/hex-tools/hex-to-float-double-converter`,
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
    name: `Hex to Binary Converter`,
    description: `Hex to Binary Converter Online`,
    href: `/hex-tools/hex-to-binary-converter`,
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

export default function HexToFloatDoubleConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Hex to Float & Double Converter Online</h1>
        <p className="text-muted-foreground">Convert hex to IEEE 754 floating-point numbers and back. Visualize the sign, exponent, and mantissa bits. An advanced tool for scientific computing, graphics programming, and binary data analysis.</p>
      </header>
      <div className="mt-8"><HexToFloatDoubleConverter /></div>
      <div className="mt-16"><HexToFloatDoubleConverterSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
