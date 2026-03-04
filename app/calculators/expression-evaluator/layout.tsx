import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Expression Evaluator",
  description: "Evaluate mathematical expressions",
  alternates: {
    canonical: "https://1000freetools.com/calculators/expression-evaluator",
  },
};

const tools = [
  {
    "name": "Quadratic Equation Solver",
    "description": "Quadratic Equation Solver",
    "href": "/quadratic-equation-solver"
  },
  {
    "name": "Linear Equation Solver",
    "description": "Linear Equation Solver – Solve ax + b = 0",
    "href": "/linear-equation-solver"
  },
  {
    "name": "Addition Calculator",
    "description": "Addition Calculator",
    "href": "/addition-calculator"
  },
  {
    "name": "Division Calculator",
    "description": "Division Calculator",
    "href": "/division-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Expression Evaluator</h1>
        <p className="text-muted-foreground">Evaluate mathematical expressions</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
