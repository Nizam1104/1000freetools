import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import RandomNumberGenerator from "@/components/number-tools/random-number-generator";
import RandomNumberGeneratorSEO from "@/components/seo-content/number-tools/random-number-generator";

export const metadata: Metadata = {
  title: `Random Number Generator | Pick Numbers Online`,
  description: `Generate custom random numbers within any range. Perfect for lotteries, games, and random sampling. No duplicates, sorting, and download options.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/random-number-generator`,
  },
};

const tools = [
  {
    name: `Number to Words Converter`,
    description: `Convert Numbers to Words Instantly`,
    href: `/number-tools/number-to-words-converter`,
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

export default function RandomNumberGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Generate Random Numbers Online
        </h1>
        <p className="text-muted-foreground">
          Create custom random numbers for games, draws, or statistical
          sampling. Set your own range, choose how many numbers you need, and
          get truly random results instantly.
        </p>
      </header>
      <div className="mt-8">
        <RandomNumberGenerator />
      </div>
      <div className="mt-8">
        <RandomNumberGeneratorSEO />
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
