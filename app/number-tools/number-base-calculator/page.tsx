import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import NumberBaseCalculator from "@/components/number-tools/number-base-calculator";
import NumberBaseCalculatorSEO from "@/components/seo-content/number-tools/number-base-calculator";

export const metadata: Metadata = {
  title: `Number Base Calculator | Binary Arithmetic Tool`,
  description: `Perform addition, subtraction, multiplication, and division in binary, hex, octal, or decimal. Step-by-step arithmetic calculator for different number bases.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/number-base-calculator`,
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

export default function NumberBaseCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Do Math in Binary, Hex, and More
        </h1>
        <p className="text-muted-foreground">
          Add, subtract, multiply, or divide numbers in binary, hexadecimal,
          octal, or decimal. Perfect for low-level programming and computer
          science homework.
        </p>
      </header>
      <div className="mt-8">
        <NumberBaseCalculator />
      </div>
      <div className="mt-8">
        <NumberBaseCalculatorSEO />
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
