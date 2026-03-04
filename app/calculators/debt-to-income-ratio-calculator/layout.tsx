import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Debt-to-Income Ratio Calculator",
  description: "Assess your borrowing capacity in seconds. Calculate the percentage of your gross monthly income consumed by debt payments to understand your financial health.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/debt-to-income-ratio-calculator",
  },
};

const tools = [
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/50-30-20-budget-rule-calculator"
  },
  {
    "name": "Credit Card Payoff Calculator",
    "description": "Credit Card Payoff Calculator",
    "href": "/credit-card-payoff-calculator"
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
    "name": "Monthly Budget Breakdown Calculator",
    "description": "Monthly Budget Breakdown Calculator",
    "href": "/monthly-budget-breakdown-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
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
