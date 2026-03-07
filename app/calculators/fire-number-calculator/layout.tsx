import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "FIRE Number Calculator – Financial Independence",
  description: "Calculate your FIRE number—the net worth needed to retire early. Based on your annual expenses and safe withdrawal rate, find your path to financial independence.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/fire-number-calculator",
  },
};

const tools = [
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
  },
  {
    "name": "Retirement Age Calculator",
    "description": "Retirement Age Calculator – Free Retirement Date Calculator",
    "href": "/calculators/retirement-age-calculator"
  },
  {
    "name": "Retirement Corpus Calculator",
    "description": "Retirement Corpus Calculator",
    "href": "/calculators/retirement-corpus-calculator"
  },
  {
    "name": "Retirement Withdrawal Rate Calculator",
    "description": "Retirement Withdrawal Rate Calculator",
    "href": "/calculators/retirement-withdrawal-rate-calculator"
  },
  {
    "name": "Rule Of 72 Calculator",
    "description": "Rule of 72 Calculator",
    "href": "/calculators/rule-of-72-calculator"
  },
  {
    "name": "Savings Goal Calculator",
    "description": "Savings Goal Calculator",
    "href": "/calculators/savings-goal-calculator"
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
