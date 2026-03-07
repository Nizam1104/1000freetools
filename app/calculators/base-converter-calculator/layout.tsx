import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Base Converter Calculator",
  description: "Convert numbers between different bases (2-36)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/base-converter-calculator",
  },
};

const tools = [
  {
    "name": "Decimal To Fraction Calculator",
    "description": "Decimal to Fraction Calculator",
    "href": "/calculators/decimal-to-fraction-calculator"
  },
  {
    "name": "Fraction To Decimal Calculator",
    "description": "Fraction to Decimal Calculator",
    "href": "/calculators/fraction-to-decimal-calculator"
  },
  {
    "name": "Number To Words Converter",
    "description": "Number to Words Converter",
    "href": "/calculators/number-to-words-converter"
  },
  {
    "name": "Roman Numerals Converter",
    "description": "Roman Numerals Converter",
    "href": "/calculators/roman-numerals-converter"
  },
  {
    "name": "Scientific Notation Calculator",
    "description": "Scientific Notation Calculator – Convert to Standard Form",
    "href": "/calculators/scientific-notation-calculator"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/calculators/expression-evaluator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Base Converter Calculator</h1>
        <p className="text-muted-foreground">Convert numbers between different bases (2-36)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
