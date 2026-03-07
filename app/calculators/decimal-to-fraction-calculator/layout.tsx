import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Decimal to Fraction Calculator",
  description: "Convert a decimal to a simplified fraction",
  alternates: {
    canonical: "https://1000freetools.com/calculators/decimal-to-fraction-calculator",
  },
};

const tools = [
  {
    "name": "Fraction To Decimal Calculator",
    "description": "Fraction to Decimal Calculator",
    "href": "/calculators/fraction-to-decimal-calculator"
  },
  {
    "name": "Simplify Fraction Calculator",
    "description": "Simplify Fraction Calculator",
    "href": "/calculators/simplify-fraction-calculator"
  },
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/calculators/base-converter-calculator"
  },
  {
    "name": "Number To Words Converter",
    "description": "Number to Words Converter",
    "href": "/calculators/number-to-words-converter"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/calculators/expression-evaluator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Decimal to Fraction Calculator</h1>
        <p className="text-muted-foreground">Convert a decimal to a simplified fraction</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
