import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Cost of Capital Calculator",
  description: "Calculate your company's cost of equity and cost of debt separately to understand the minimum return required to justify investment decisions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cost-of-capital-calculator",
  },
};

const tools = [
  {
    "name": "Wacc Calculator",
    "description": "WACC Calculator – Weighted Average Cost of Capital",
    "href": "/calculators/wacc-calculator"
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
