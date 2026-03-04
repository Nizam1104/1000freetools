import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Modulo Calculator",
  description: "Calculate the remainder: a mod n",
  alternates: {
    canonical: "https://1000freetools.com/calculators/modulo-calculator",
  },
};

const tools = [
  {
    "name": "Division Calculator",
    "description": "Division Calculator",
    "href": "/division-calculator"
  },
  {
    "name": "Addition Calculator",
    "description": "Addition Calculator",
    "href": "/addition-calculator"
  },
  {
    "name": "Multiplication Calculator",
    "description": "Multiplication Calculator",
    "href": "/multiplication-calculator"
  },
  {
    "name": "Subtraction Calculator",
    "description": "Subtraction Calculator – Subtract Numbers Instantly",
    "href": "/subtraction-calculator"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/expression-evaluator"
  },
  {
    "name": "Percentage Calculator",
    "description": "Percentage Calculator – Calculate Percentages Instantly",
    "href": "/percentage-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Modulo Calculator</h1>
        <p className="text-muted-foreground">Calculate the remainder: a mod n</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
