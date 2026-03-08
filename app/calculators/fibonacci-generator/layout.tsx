import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Fibonacci Generator",
  description: "Generate Fibonacci sequence up to n terms",
  alternates: {
    canonical: "https://1000freetools.com/calculators/fibonacci-generator",
  },
};

const tools = [
  {
    "name": "Arithmetic Sequence Calculator",
    "description": "Arithmetic Sequence Calculator",
    "href": "/calculators/arithmetic-sequence-calculator"
  },
  {
    "name": "Geometric Sequence Calculator",
    "description": "Geometric Sequence Calculator",
    "href": "/calculators/geometric-sequence-calculator"
  },
  {
    "name": "Pascals Triangle Calculator",
    "description": "Pascal's Triangle Calculator",
    "href": "/calculators/pascals-triangle-calculator"
  },
  {
    "name": "Factorial Calculator",
    "description": "Factorial Calculator",
    "href": "/calculators/factorial-calculator"
  },
  {
    "name": "Combination Calculator",
    "description": "Combination Calculator",
    "href": "/calculators/combination-calculator"
  },
  {
    "name": "Permutation Calculator",
    "description": "Permutation Calculator",
    "href": "/calculators/permutation-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Fibonacci Generator</h1>
        <p className="text-muted-foreground">Generate Fibonacci sequence up to n terms</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
