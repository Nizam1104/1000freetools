import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "4% Rule Retirement Calculator",
  description: "Apply the classic 4% rule to your retirement plan. Calculate the corpus needed to withdraw 4% annually and see if your current savings are on track.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/4-percent-rule-retirement-calculator",
  },
};

const tools = [
  {
    "name": "Fire Number Calculator",
    "description": "FIRE Number Calculator – Financial Independence",
    "href": "/fire-number-calculator"
  },
  {
    "name": "Retirement Age Calculator",
    "description": "Retirement Age Calculator – Free Retirement Date Calculator",
    "href": "/retirement-age-calculator"
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
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/50-30-20-budget-rule-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">4% Rule Retirement Calculator</h1>
        <p className="text-muted-foreground">Apply the classic 4% rule to your retirement plan. Calculate the corpus needed to withdraw 4% annually and see if your current savings are on track.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
