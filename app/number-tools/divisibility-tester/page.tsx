import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import NumberDivisibilityTester from "@/components/number-tools/number-divisibility-tester";
import NumberDivisibilityTesterSeo from "@/components/seo-content/number-tools/number-divisibility-tester";

export const metadata: Metadata = {
  title: `Divisibility Tester | Check Division Rules`,
  description: `Test if a number is divisible by another. Learn divisibility rules for 2,3,5,9,10,11. Find all divisors of a number up to a limit.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/divisibility-tester`,
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

export default function DivisibilityTesterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Test Number Divisibility Rules</h1>
        <p className="text-muted-foreground">Check if one number divides evenly into another. Learn and apply common divisibility rules for 2, 3, 5, 9, 10, and 11 with our interactive tester.</p>
      </header>
      <div className="mt-8">
        <NumberDivisibilityTester />
      </div>
      <div className="mt-8">
        <NumberDivisibilityTesterSeo />
      </div>
      {/* TODO: add seo component for divisibility-tester */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
