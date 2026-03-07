import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Logarithm Calculator",
  description: "Calculate logarithms with different bases",
  alternates: {
    canonical: "https://1000freetools.com/calculators/logarithm-calculator",
  },
};

const tools = [
  {
    "name": "Antilog Calculator",
    "description": "Antilog Calculator",
    "href": "/calculators/antilog-calculator"
  },
  {
    "name": "Exponent Calculator",
    "description": "Exponent Calculator",
    "href": "/calculators/exponent-calculator"
  },
  {
    "name": "Root Calculator",
    "description": "Root Calculator – Calculate Square, Cube and Nth Roots",
    "href": "/calculators/root-calculator"
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
  },
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/calculators/base-converter-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Logarithm Calculator</h1>
        <p className="text-muted-foreground">Calculate logarithms with different bases</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
