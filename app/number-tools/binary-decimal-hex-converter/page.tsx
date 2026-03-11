import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryDecimalHexConverter from "@/components/number-tools/binary-decimal-hex-converter";
import BinaryDecimalHexConverterSEO from "@/components/seo-content/number-tools/binary-decimal-hex-converter";

export const metadata: Metadata = {
  title: `Number Base Converter | Binary, Decimal, Hex, Octal`,
  description: `Free online converter for binary, decimal, hexadecimal, and octal number systems. Real-time conversion with bitwise calculator for programmers.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/binary-decimal-hex-converter`,
  },
};

const tools = [
  {
    name: `Number to Words Converter`,
    description: `Convert Numbers to Words Instantly`,
    href: `/number-tools/number-to-words-converter`,
  },
  {
    name: `Random Number Generator`,
    description: `Generate Random Numbers Online`,
    href: `/number-tools/random-number-generator`,
  },
  {
    name: `Percentage Calculator`,
    description: `Calculate Percentages Easily`,
    href: `/number-tools/percentage-calculator`,
  },
  {
    name: `Prime Number Checker`,
    description: `Is This Number Prime? Check Instantly`,
    href: `/number-tools/prime-number-checker`,
  },
  {
    name: `Roman Numeral Converter`,
    description: `Convert to and from Roman Numerals`,
    href: `/number-tools/roman-numeral-converter`,
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

export default function BinaryDecimalHexConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert Between Number Bases
        </h1>
        <p className="text-muted-foreground">
          Instantly convert numbers between binary, decimal, hexadecimal, and
          octal. Essential for programmers, students, and anyone working with
          digital systems.
        </p>
      </header>
      <div className="mt-8">
        <BinaryDecimalHexConverter />
      </div>
      <div className="mt-8">
        <BinaryDecimalHexConverterSEO />
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
