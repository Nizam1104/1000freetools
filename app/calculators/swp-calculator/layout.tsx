import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "SWP Calculator – Systematic Withdrawal Plan",
  description: "Find out how long your retirement corpus will last or how much you can withdraw monthly. Plan sustainable withdrawals based on corpus size and expected returns.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/swp-calculator",
  },
};

const tools = [
  {
    "name": "Sip Calculator",
    "description": "SIP Calculator",
    "href": "/calculators/sip-calculator"
  },
  {
    "name": "Sip Step Up Calculator",
    "description": "SIP Step-Up Calculator",
    "href": "/calculators/sip-step-up-calculator"
  },
  {
    "name": "Step Down Sip Calculator",
    "description": "Step-Down SIP Calculator",
    "href": "/calculators/step-down-sip-calculator"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/calculators/dollar-cost-averaging-calculator"
  },
  {
    "name": "Lump Sum Vs Sip Analyzer",
    "description": "Lump Sum vs SIP Analyzer",
    "href": "/calculators/lump-sum-vs-sip-analyzer"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/calculators/future-value-calculator"
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
