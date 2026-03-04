import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Investment Return Rate Calculator",
  description: "Work backwards from your goal. Calculate the annualized return rate needed to grow your investment from a starting value to a target amount over a set period.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/investment-return-rate-calculator",
  },
};

const tools = [
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/future-value-calculator"
  },
  {
    "name": "Compound Interest Calculator",
    "description": "Compound Interest Calculator",
    "href": "/compound-interest-calculator"
  },
  {
    "name": "Compounding Frequency Comparison",
    "description": "Compounding Frequency Comparison Calculator",
    "href": "/compounding-frequency-comparison"
  },
  {
    "name": "Simple Interest Calculator",
    "description": "Simple Interest Calculator",
    "href": "/simple-interest-calculator"
  },
  {
    "name": "Rule Of 72 Calculator",
    "description": "Rule of 72 Calculator",
    "href": "/rule-of-72-calculator"
  },
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/roi-calculator"
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
