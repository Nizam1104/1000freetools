import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Step-Down SIP Calculator",
  description: "Model a SIP where contributions taper down each year. Ideal for retirement planning or winding down an investment phase with decreasing monthly installments.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/step-down-sip-calculator",
  },
};

const tools = [
  {
    "name": "Sip Calculator",
    "description": "SIP Calculator",
    "href": "/sip-calculator"
  },
  {
    "name": "Sip Step Up Calculator",
    "description": "SIP Step-Up Calculator",
    "href": "/sip-step-up-calculator"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/dollar-cost-averaging-calculator"
  },
  {
    "name": "Lump Sum Vs Sip Analyzer",
    "description": "Lump Sum vs SIP Analyzer",
    "href": "/lump-sum-vs-sip-analyzer"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/future-value-calculator"
  },
  {
    "name": "Investment Return Rate Calculator",
    "description": "Investment Return Rate Calculator",
    "href": "/investment-return-rate-calculator"
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
