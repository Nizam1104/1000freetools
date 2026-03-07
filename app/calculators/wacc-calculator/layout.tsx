import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "WACC Calculator – Weighted Average Cost of Capital",
  description: "Calculate your company's Weighted Average Cost of Capital using equity, debt, tax rate, and their proportions in the capital structure.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wacc-calculator",
  },
};

const tools = [
  {
    "name": "Cost Of Capital Calculator",
    "description": "Cost of Capital Calculator",
    "href": "/calculators/cost-of-capital-calculator"
  },
  {
    "name": "Ebitda Calculator",
    "description": "EBITDA Calculator",
    "href": "/calculators/ebitda-calculator"
  },
  {
    "name": "Net Profit Margin Calculator",
    "description": "Net Profit Margin Calculator",
    "href": "/calculators/net-profit-margin-calculator"
  },
  {
    "name": "Operating Margin Calculator",
    "description": "Operating Margin Calculator",
    "href": "/calculators/operating-margin-calculator"
  },
  {
    "name": "Profit Margin Calculator",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup",
    "href": "/calculators/profit-margin-calculator"
  },
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/calculators/roi-calculator"
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
