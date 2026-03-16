import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PrimeNumberChecker from "@/components/number-tools/prime-number-checker";
import PrimeNumberCheckerSEO from "@/components/seo-content/number-tools/prime-number-checker";

export const metadata: Metadata = {
  title: `Prime Number Checker | Free Online Tester`,
  description: `Check if a number is prime or composite instantly. See divisors, find next/previous primes, and generate prime number lists within any range.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/prime-number-checker`,
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

export default function PrimeNumberCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Is This Number Prime? Check Instantly
        </h1>
        <p className="text-muted-foreground">
          Quickly determine if any integer is a prime number. Our tool checks
          for primality, shows divisors for composite numbers, and can find
          neighboring primes.
        </p>
      </header>
      <div className="mt-8">
        <PrimeNumberChecker />
      </div>
      <div className="mt-8">
        <PrimeNumberCheckerSEO />
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
