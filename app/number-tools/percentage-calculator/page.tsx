import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PercentageCalculator from "@/components/number-tools/percentage-calculator";
import PercentageCalculatorSEO from "@/components/seo-content/number-tools/percentage-calculator";

export const metadata: Metadata = {
  title: `Percentage Calculator | Free Online Math Tool`,
  description: `Free percentage calculator for discounts, tips, increases, and more. Calculate what percent, find percentages of numbers, and solve percentage problems.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/percentage-calculator`,
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

export default function PercentageCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Calculate Percentages Easily
        </h1>
        <p className="text-muted-foreground">
          Solve any percentage problem in seconds. Calculate discounts, tips,
          tax, interest, and percentage changes with our free, step-by-step
          percentage calculator.
        </p>
      </header>
      <div className="mt-8">
        <PercentageCalculator />
      </div>
      <div className="mt-8">
        <PercentageCalculatorSEO />
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
