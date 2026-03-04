import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Monthly Budget Breakdown Calculator",
  description: "Get a clear picture of your monthly finances. Input your income and expense categories to generate a full budget breakdown with surplus, deficit, and spending percentages.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/monthly-budget-breakdown-calculator",
  },
};

const tools = [
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/50-30-20-budget-rule-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/debt-to-income-ratio-calculator"
  },
  {
    "name": "Gross Vs Net Income Calculator",
    "description": "Gross vs Net Income Calculator",
    "href": "/gross-vs-net-income-calculator"
  },
  {
    "name": "Emergency Fund Calculator",
    "description": "Emergency Fund Calculator",
    "href": "/emergency-fund-calculator"
  },
  {
    "name": "Savings Goal Calculator",
    "description": "Savings Goal Calculator",
    "href": "/savings-goal-calculator"
  },
  {
    "name": "Money Saving Challenge Calculator",
    "description": "Money-Saving Challenge Calculator – Track Your 52-Week or Custom Savings Challenge",
    "href": "/money-saving-challenge-calculator"
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
