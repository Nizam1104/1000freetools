import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Compounding Frequency Comparison Calculator",
  description: "Visualize how compounding frequency affects your returns. Compare daily, monthly, quarterly, and annual compounding side by side for the same principal and rate.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/compounding-frequency-comparison",
  },
};

const tools = [
  {
    "name": "Compound Interest Calculator",
    "description": "Compound Interest Calculator",
    "href": "/compound-interest-calculator"
  },
  {
    "name": "Simple Interest Calculator",
    "description": "Simple Interest Calculator",
    "href": "/simple-interest-calculator"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/future-value-calculator"
  },
  {
    "name": "Present Value Calculator",
    "description": "Present Value Calculator",
    "href": "/present-value-calculator"
  },
  {
    "name": "Rule Of 72 Calculator",
    "description": "Rule of 72 Calculator",
    "href": "/rule-of-72-calculator"
  },
  {
    "name": "Investment Return Rate Calculator",
    "description": "Investment Return Rate Calculator",
    "href": "/investment-return-rate-calculator"
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
