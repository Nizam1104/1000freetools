import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Royalty Calculator – Estimate Earnings from Sales and Revenue",
  description: "Calculate your royalty earnings instantly with our free Royalty Calculator. Enter units sold, price per unit, and royalty rate to see your gross revenue, royalty payout, and net earnings after deductions — perfect for authors, musicians, and creators tracking their income.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/royalty-calculator",
  },
};

const tools = [
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/roi-calculator"
  },
  {
    "name": "Profit Margin Calculator",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup",
    "href": "/profit-margin-calculator"
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
  },
  {
    "name": "Freelance Effective Hourly Rate Calculator",
    "description": "Freelance Effective Hourly Rate Calculator",
    "href": "/freelance-effective-hourly-rate-calculator"
  },
  {
    "name": "Salary To Hourly Calculator",
    "description": "Salary to Hourly Rate Calculator",
    "href": "/salary-to-hourly-calculator"
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
