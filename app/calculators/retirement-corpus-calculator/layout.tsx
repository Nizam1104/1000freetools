import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Retirement Corpus Calculator",
  description: "Estimate exactly how much you need to retire comfortably. Calculate the total corpus required to sustain your desired monthly income throughout retirement.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/retirement-corpus-calculator",
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
    "name": "Retirement Age Calculator",
    "description": "Retirement Age Calculator – Free Retirement Date Calculator",
    "href": "/retirement-age-calculator"
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
