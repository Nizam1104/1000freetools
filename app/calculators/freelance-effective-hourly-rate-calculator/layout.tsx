import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Freelance Effective Hourly Rate Calculator",
  description: "Know what you actually earn per hour. Calculate your real effective rate after non-billable hours, taxes, and business expenses are factored in.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/freelance-effective-hourly-rate-calculator",
  },
};

const tools = [
  {
    "name": "Salary To Hourly Calculator",
    "description": "Salary to Hourly Rate Calculator",
    "href": "/calculators/salary-to-hourly-calculator"
  },
  {
    "name": "Hourly Wage To Salary Calculator",
    "description": "Hourly Wage to Annual Salary Calculator",
    "href": "/calculators/hourly-wage-to-salary-calculator"
  },
  {
    "name": "Gross Vs Net Income Calculator",
    "description": "Gross vs Net Income Calculator",
    "href": "/calculators/gross-vs-net-income-calculator"
  },
  {
    "name": "Profit Margin Calculator",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup",
    "href": "/calculators/profit-margin-calculator"
  },
  {
    "name": "Margin Calculator",
    "description": "Profit Margin Calculator",
    "href": "/calculators/margin-calculator"
  },
  {
    "name": "Markup Calculator",
    "description": "Markup Calculator",
    "href": "/calculators/markup-calculator"
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
