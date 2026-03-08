import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Gross vs Net Income Calculator",
  description: "Convert your gross income to take-home pay. Subtract taxes, deductions, and contributions with an itemized breakdown to see your actual net income.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gross-vs-net-income-calculator",
  },
};

const tools = [
  {
    "name": "Hourly Wage To Salary Calculator",
    "description": "Hourly Wage to Annual Salary Calculator",
    "href": "/calculators/hourly-wage-to-salary-calculator"
  },
  {
    "name": "Salary To Hourly Calculator",
    "description": "Salary to Hourly Rate Calculator",
    "href": "/calculators/salary-to-hourly-calculator"
  },
  {
    "name": "Freelance Effective Hourly Rate Calculator",
    "description": "Freelance Effective Hourly Rate Calculator",
    "href": "/calculators/freelance-effective-hourly-rate-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/calculators/debt-to-income-ratio-calculator"
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
