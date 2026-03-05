import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Permutation Calculator",
  description: "Calculate arrangements where order matters: P(n,r)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/permutation-calculator",
  },
};

const tools = [
  {
    "name": "Combination Calculator",
    "description": "Combination Calculator",
    "href": "/combination-calculator"
  },
  {
    "name": "Factorial Calculator",
    "description": "Factorial Calculator",
    "href": "/factorial-calculator"
  },
  {
    "name": "Pascals Triangle Calculator",
    "description": "Pascal's Triangle Calculator",
    "href": "/pascals-triangle-calculator"
  },
  {
    "name": "Gcd Calculator",
    "description": "GCD / HCF Calculator",
    "href": "/gcd-calculator"
  },
  {
    "name": "Lcm Calculator",
    "description": "LCM Calculator – Find Least Common Multiple Online",
    "href": "/lcm-calculator"
  },
  {
    "name": "Fibonacci Generator",
    "description": "Fibonacci Generator",
    "href": "/fibonacci-generator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Permutation Calculator</h1>
        <p className="text-muted-foreground">Calculate arrangements where order matters: P(n,r)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
