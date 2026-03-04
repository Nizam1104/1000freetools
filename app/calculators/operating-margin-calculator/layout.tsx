import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Operating Margin Calculator",
  description: "Measure your business's core profitability. Calculate operating profit margin percentage from revenue and operating expenses, before interest and taxes.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/operating-margin-calculator",
  },
};

const tools = [
  {
    "name": "Net Profit Margin Calculator",
    "description": "Net Profit Margin Calculator",
    "href": "/net-profit-margin-calculator"
  },
  {
    "name": "Profit Margin Calculator",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup",
    "href": "/profit-margin-calculator"
  },
  {
    "name": "Ebitda Calculator",
    "description": "EBITDA Calculator",
    "href": "/ebitda-calculator"
  },
  {
    "name": "Cost Of Capital Calculator",
    "description": "Cost of Capital Calculator",
    "href": "/cost-of-capital-calculator"
  },
  {
    "name": "Margin Calculator",
    "description": "Profit Margin Calculator",
    "href": "/margin-calculator"
  },
  {
    "name": "Markup Calculator",
    "description": "Markup Calculator",
    "href": "/markup-calculator"
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
