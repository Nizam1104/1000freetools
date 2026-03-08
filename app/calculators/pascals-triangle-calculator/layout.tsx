import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pascal's Triangle Calculator",
  description: "Generate Pascal's triangle up to n rows",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pascals-triangle-calculator",
  },
};

const tools = [
  {
    "name": "Fibonacci Generator",
    "description": "Fibonacci Generator",
    "href": "/calculators/fibonacci-generator"
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
  },
  {
    "name": "Gcd Calculator",
    "description": "GCD / HCF Calculator",
    "href": "/calculators/gcd-calculator"
  },
  {
    "name": "Lcm Calculator",
    "description": "LCM Calculator – Find Least Common Multiple Online",
    "href": "/calculators/lcm-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pascal's Triangle Calculator</h1>
        <p className="text-muted-foreground">Generate Pascal's triangle up to n rows</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
