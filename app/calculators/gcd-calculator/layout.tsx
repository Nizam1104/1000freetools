import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "GCD / HCF Calculator",
  description: "Find the Greatest Common Divisor (Highest Common Factor)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gcd-calculator",
  },
};

const tools = [
  {
    "name": "Lcm Calculator",
    "description": "LCM Calculator – Find Least Common Multiple Online",
    "href": "/lcm-calculator"
  },
  {
    "name": "Prime Factorization Calculator",
    "description": "Prime Factorization Calculator – Find Prime Factors",
    "href": "/prime-factorization-calculator"
  },
  {
    "name": "Prime Checker",
    "description": "Prime Number Checker – Is This Number Prime?",
    "href": "/prime-checker"
  },
  {
    "name": "Factorial Calculator",
    "description": "Factorial Calculator",
    "href": "/factorial-calculator"
  },
  {
    "name": "Combination Calculator",
    "description": "Combination Calculator",
    "href": "/combination-calculator"
  },
  {
    "name": "Permutation Calculator",
    "description": "Permutation Calculator",
    "href": "/permutation-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">GCD / HCF Calculator</h1>
        <p className="text-muted-foreground">Find the Greatest Common Divisor (Highest Common Factor)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
