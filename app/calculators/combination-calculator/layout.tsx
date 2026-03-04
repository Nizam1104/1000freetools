import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Combination Calculator",
  description: "Calculate selections where order doesn't matter: C(n,r)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/combination-calculator",
  },
};

const tools = [
  {
    "name": "Permutation Calculator",
    "description": "Permutation Calculator",
    "href": "/permutation-calculator"
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
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Combination Calculator</h1>
        <p className="text-muted-foreground">Calculate selections where order doesn't matter: C(n,r)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
