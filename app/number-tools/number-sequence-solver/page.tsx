import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import NumberSequenceSolver from "@/components/number-tools/number-sequence-solver";
import NumberSequenceSolverSEO from "@/components/seo-content/number-tools/number-sequence-solver";

export const metadata: Metadata = {
  title: `Number Sequence Solver | Find the Pattern`,
  description: `Solve number sequence puzzles instantly. Input your numbers, and our tool finds the pattern, provides the formula, and predicts the next terms.`,
  alternates: {
    canonical: `https://1000freetools.com/number-tools/number-sequence-solver`,
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

export default function NumberSequenceSolverPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Find the Next Number in a Sequence
        </h1>
        <p className="text-muted-foreground">
          Stuck on a number pattern puzzle? Our sequence solver analyzes your
          numbers, finds the underlying rule, and predicts what comes next.
        </p>
      </header>
      <div className="mt-8">
        <NumberSequenceSolver />
      </div>
      <div className="mt-8">
        <NumberSequenceSolverSEO />
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
