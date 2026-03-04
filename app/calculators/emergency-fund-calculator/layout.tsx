import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator",
  description: "Find out how large your emergency fund should be. Enter your monthly expenses and desired months of coverage to get your recommended safety net target.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/emergency-fund-calculator",
  },
};

const tools = [
  {
    "name": "Savings Goal Calculator",
    "description": "Savings Goal Calculator",
    "href": "/savings-goal-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/50-30-20-budget-rule-calculator"
  },
  {
    "name": "Monthly Budget Breakdown Calculator",
    "description": "Monthly Budget Breakdown Calculator",
    "href": "/monthly-budget-breakdown-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/debt-to-income-ratio-calculator"
  },
  {
    "name": "Fire Number Calculator",
    "description": "FIRE Number Calculator – Financial Independence",
    "href": "/fire-number-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/4-percent-rule-retirement-calculator"
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
