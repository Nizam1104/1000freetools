import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Factorial Calculator",
  description: "Calculate the factorial of a number (n!)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/factorial-calculator",
  },
};

const tools = [
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
    "name": "Pascals Triangle Calculator",
    "description": "Pascal's Triangle Calculator",
    "href": "/calculators/pascals-triangle-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Factorial Calculator</h1>
        <p className="text-muted-foreground">Calculate the factorial of a number (n!)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
