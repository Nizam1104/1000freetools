import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Lump Sum vs SIP Analyzer",
  description: "Compare investing all at once versus spreading it out monthly. Analyze the final corpus from a lump sum investment versus an equivalent total via monthly SIP.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/lump-sum-vs-sip-analyzer",
  },
};

const tools = [
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/dollar-cost-averaging-calculator"
  },
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
    "name": "Step Down Sip Calculator",
    "description": "Step-Down SIP Calculator",
    "href": "/step-down-sip-calculator"
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
