import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import NumberToWordsConverter from "@/components/number-tools/number-to-words-converter";
import NumberToWordsConverterSEO from "@/components/seo-content/number-tools/number-to-words-converter";

export const metadata: Metadata = {
  title: `Number to Words Converter | Free Online Tool`,
  description: `Convert any number to its written English words instantly. Perfect for checks, invoices, and formal documents. Supports integers, decimals, and currency.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/number-to-words-converter`,
  },
};

const tools = [
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
    name: `Binary, Decimal, Hex Converter`,
    description: `Convert Between Number Bases`,
    href: `/number-tools/binary-decimal-hex-converter`,
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

export default function NumberToWordsConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert Numbers to Words Instantly
        </h1>
        <p className="text-muted-foreground">
          Need to write a check or formal document? Our free Number to Words
          Converter transforms any digit into its full written English
          equivalent. It handles integers, decimals, and currency with support
          for US and UK English formats.
        </p>
      </header>
      <div className="mt-8">
        <NumberToWordsConverter />
      </div>
      <div className="mt-8">
        <NumberToWordsConverterSEO />
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
