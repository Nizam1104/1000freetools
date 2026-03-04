import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Retirement Age Calculator – Free Retirement Date Calculator",
  description: "Calculate when you can retire based on your birth date and desired retirement age. Find out exactly how many years, months, and days until your retirement.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/retirement-age-calculator",
  },
};

const tools = [
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/4-percent-rule-retirement-calculator"
  },
  {
    "name": "Fire Number Calculator",
    "description": "FIRE Number Calculator – Financial Independence",
    "href": "/fire-number-calculator"
  },
  {
    "name": "Retirement Corpus Calculator",
    "description": "Retirement Corpus Calculator",
    "href": "/retirement-corpus-calculator"
  },
  {
    "name": "Retirement Withdrawal Rate Calculator",
    "description": "Retirement Withdrawal Rate Calculator",
    "href": "/retirement-withdrawal-rate-calculator"
  },
  {
    "name": "Rule Of 72 Calculator",
    "description": "Rule of 72 Calculator",
    "href": "/rule-of-72-calculator"
  },
  {
    "name": "Savings Goal Calculator",
    "description": "Savings Goal Calculator",
    "href": "/savings-goal-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Retirement Age Calculator – Free Retirement Date Calculator</h1>
        <p className="text-muted-foreground">Calculate when you can retire based on your birth date and desired retirement age. Find out exactly how many years, months, and days until your retirement.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
