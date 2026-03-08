import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Dollar-Cost Averaging (DCA) Calculator",
  description: "Simulate investing a fixed amount at regular intervals over time. Calculate your average cost per unit, total invested, and final portfolio value with DCA.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dollar-cost-averaging-calculator",
  },
};

const tools = [
  {
    "name": "Dividend Payout Calculator",
    "description": "Dividend Payout Calculator",
    "href": "/calculators/dividend-payout-calculator"
  },
  {
    "name": "Dividend Reinvestment Calculator",
    "description": "Dividend Reinvestment (DRIP) Calculator",
    "href": "/calculators/dividend-reinvestment-calculator"
  },
  {
    "name": "Lump Sum Vs Sip Analyzer",
    "description": "Lump Sum vs SIP Analyzer",
    "href": "/calculators/lump-sum-vs-sip-analyzer"
  },
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
