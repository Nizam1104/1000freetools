import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Matrix Multiplication Calculator",
  description: "Multiply two matrices (A × B)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/matrix-multiplication-calculator",
  },
};

const tools = [
  {
    "name": "Matrix Addition Calculator",
    "description": "Matrix Addition Calculator",
    "href": "/calculators/matrix-addition-calculator"
  },
  {
    "name": "Determinant Calculator",
    "description": "Determinant Calculator",
    "href": "/calculators/determinant-calculator"
  },
  {
    "name": "Inverse Matrix Calculator",
    "description": "Inverse Matrix Calculator",
    "href": "/calculators/inverse-matrix-calculator"
  },
  {
    "name": "Linear Equation Solver",
    "description": "Linear Equation Solver – Solve ax + b = 0",
    "href": "/calculators/linear-equation-solver"
  },
  {
    "name": "Quadratic Equation Solver",
    "description": "Quadratic Equation Solver",
    "href": "/calculators/quadratic-equation-solver"
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
        <h1 className="text-3xl font-bold mb-3">Matrix Multiplication Calculator</h1>
        <p className="text-muted-foreground">Multiply two matrices (A × B)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
