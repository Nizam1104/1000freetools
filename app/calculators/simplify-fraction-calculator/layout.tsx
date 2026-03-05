import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Simplify Fraction Calculator",
  description: "Reduce a fraction to its simplest form",
  alternates: {
    canonical: "https://1000freetools.com/calculators/simplify-fraction-calculator",
  },
};

const tools = [
  {
    "name": "Decimal To Fraction Calculator",
    "description": "Decimal to Fraction Calculator",
    "href": "/decimal-to-fraction-calculator"
  },
  {
    "name": "Fraction To Decimal Calculator",
    "description": "Fraction to Decimal Calculator",
    "href": "/fraction-to-decimal-calculator"
  },
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/base-converter-calculator"
  },
  {
    "name": "Number To Words Converter",
    "description": "Number to Words Converter",
    "href": "/number-to-words-converter"
  },
  {
    "name": "Roman Numerals Converter",
    "description": "Roman Numerals Converter",
    "href": "/roman-numerals-converter"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/expression-evaluator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Simplify Fraction Calculator</h1>
        <p className="text-muted-foreground">Reduce a fraction to its simplest form</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
