import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rule of 72 Calculator",
  description: "Estimate how long it takes to double your money with a simple mental math shortcut. Divide 72 by your annual interest rate to get the approximate doubling time.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rule-of-72-calculator",
  },
};

const tools = [
  {
    "name": "Compound Interest Calculator",
    "description": "Compound Interest Calculator",
    "href": "/calculators/compound-interest-calculator"
  },
  {
    "name": "Compounding Frequency Comparison",
    "description": "Compounding Frequency Comparison Calculator",
    "href": "/calculators/compounding-frequency-comparison"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/calculators/future-value-calculator"
  },
  {
    "name": "Present Value Calculator",
    "description": "Present Value Calculator",
    "href": "/calculators/present-value-calculator"
  },
  {
    "name": "Investment Return Rate Calculator",
    "description": "Investment Return Rate Calculator",
    "href": "/calculators/investment-return-rate-calculator"
  },
  {
    "name": "Simple Interest Calculator",
    "description": "Simple Interest Calculator",
    "href": "/calculators/simple-interest-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
