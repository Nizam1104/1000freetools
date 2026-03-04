import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Working Capital Calculator",
  description: "Assess your company's short-term financial health. Calculate net working capital and the working capital ratio from current assets and current liabilities.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/working-capital-calculator",
  },
};

const tools = [
  {
    "name": "Ebitda Calculator",
    "description": "EBITDA Calculator",
    "href": "/ebitda-calculator"
  },
  {
    "name": "Net Profit Margin Calculator",
    "description": "Net Profit Margin Calculator",
    "href": "/net-profit-margin-calculator"
  },
  {
    "name": "Operating Margin Calculator",
    "description": "Operating Margin Calculator",
    "href": "/operating-margin-calculator"
  },
  {
    "name": "Profit Margin Calculator",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup",
    "href": "/profit-margin-calculator"
  },
  {
    "name": "Cost Of Capital Calculator",
    "description": "Cost of Capital Calculator",
    "href": "/cost-of-capital-calculator"
  },
  {
    "name": "Wacc Calculator",
    "description": "WACC Calculator – Weighted Average Cost of Capital",
    "href": "/wacc-calculator"
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
