import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Savings Goal Calculator",
  description: "Figure out how much to save each month—or how long it will take—to reach any financial goal. Accounts for your target amount and expected interest rate.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/savings-goal-calculator",
  },
};

const tools = [
  {
    "name": "Emergency Fund Calculator",
    "description": "Emergency Fund Calculator",
    "href": "/calculators/emergency-fund-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/calculators/50-30-20-budget-rule-calculator"
  },
  {
    "name": "Monthly Budget Breakdown Calculator",
    "description": "Monthly Budget Breakdown Calculator",
    "href": "/calculators/monthly-budget-breakdown-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/calculators/debt-to-income-ratio-calculator"
  },
  {
    "name": "Fire Number Calculator",
    "description": "FIRE Number Calculator – Financial Independence",
    "href": "/calculators/fire-number-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
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
