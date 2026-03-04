import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Profit Margin Calculator",
  description: "Calculate your gross profit margin percentage from revenue and cost, or find the selling price needed to hit a target margin. Built for businesses and freelancers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/margin-calculator",
  },
};

const tools = [
  {
    "name": "Markup Calculator",
    "description": "Markup Calculator",
    "href": "/markup-calculator"
  },
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
    "name": "Operating Margin Calculator",
    "description": "Operating Margin Calculator",
    "href": "/operating-margin-calculator"
  },
  {
    "name": "Discount Calculator",
    "description": "Discount Calculator – Calculate Sale Price & Savings",
    "href": "/discount-calculator"
  },
  {
    "name": "Discount Stacking Calculator",
    "description": "Discount Stacking Calculator – Calculate Final Price After Multiple Discounts",
    "href": "/discount-stacking-calculator"
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
