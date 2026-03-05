import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Salary to Hourly Rate Calculator",
  description: "Convert your annual or monthly salary to an equivalent hourly rate. Customize based on work hours and days per week for a true per-hour breakdown.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/salary-to-hourly-calculator",
  },
};

const tools = [
  {
    "name": "Hourly Wage To Salary Calculator",
    "description": "Hourly Wage to Annual Salary Calculator",
    "href": "/hourly-wage-to-salary-calculator"
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
