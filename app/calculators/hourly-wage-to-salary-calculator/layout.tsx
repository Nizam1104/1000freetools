import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Hourly Wage to Annual Salary Calculator",
  description: "Convert any hourly pay rate to an annual, monthly, or weekly salary equivalent. Based on your hours worked per week for a fast, accurate comparison.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/hourly-wage-to-salary-calculator",
  },
};

const tools = [
  {
    "name": "Salary To Hourly Calculator",
    "description": "Salary to Hourly Rate Calculator",
    "href": "/salary-to-hourly-calculator"
  },
  {
    "name": "Freelance Effective Hourly Rate Calculator",
    "description": "Freelance Effective Hourly Rate Calculator",
    "href": "/freelance-effective-hourly-rate-calculator"
  },
  {
    "name": "Gross Vs Net Income Calculator",
    "description": "Gross vs Net Income Calculator",
    "href": "/gross-vs-net-income-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/debt-to-income-ratio-calculator"
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
