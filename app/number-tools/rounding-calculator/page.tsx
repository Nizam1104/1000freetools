import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import NumberSystemRoundingCalculator from "@/components/number-tools/number-system-rounding-calculator";
import NumberSystemRoundingCalculatorSeo from "@/components/seo-content/number-tools/number-system-rounding-calculator";

export const metadata: Metadata = {
  title: `Rounding Calculator | Decimal & Significant Figures`,
  description: `Free rounding calculator for decimals and integers. Round to decimal places, significant figures, or nearest ten/hundred. Multiple rounding rules included.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/rounding-calculator`,
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
    name: `Binary, Decimal, Hex Converter`,
    description: `Convert Between Number Bases`,
    href: `/number-tools/binary-decimal-hex-converter`,
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

export default function RoundingCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Round Numbers to Any Precision</h1>
        <p className="text-muted-foreground">Round decimals, integers, or significant figures using different rounding rules. Choose from standard, banker's, or custom methods for precise results.</p>
      </header>
      <div className="mt-8">
        <NumberSystemRoundingCalculator />
      </div>
      <div className="mt-8">
        <NumberSystemRoundingCalculatorSeo />
      </div>
      <div className="mt-16">
        <RoundingCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
