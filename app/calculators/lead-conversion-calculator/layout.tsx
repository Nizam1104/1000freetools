import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Lead Conversion Calculator – Calculate Your Sales Conversion Rate & Cost Per Lead",
  description: "Understand how well your marketing funnel is performing with our Lead Conversion Calculator.            Enter total leads, conversions, and marketing spend to calculate your conversion rate            and cost per lead — key metrics for optimizing sales and marketing performance.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/lead-conversion-calculator",
  },
};

const tools = [
  {
    "name": "Customer Acquisition Cost Calculator",
    "description": "Customer Acquisition Cost (CAC) Calculator – Find Out How Much Each New Customer Costs",
    "href": "/customer-acquisition-cost-calculator"
  },
  {
    "name": "Customer Lifetime Value Calculator",
    "description": "Customer Lifetime Value (CLV) Calculator – Measure Customer Worth",
    "href": "/customer-lifetime-value-calculator"
  },
  {
    "name": "Funnel Drop Off Calculator",
    "description": "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel",
    "href": "/funnel-drop-off-calculator"
  },
  {
    "name": "Cpc Cpm Ctr Calculator",
    "description": "CPC, CPM & CTR Calculator – Measure Your Digital Ad Campaign Performance",
    "href": "/cpc-cpm-ctr-calculator"
  },
  {
    "name": "Nps Score Calculator",
    "description": "NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results",
    "href": "/nps-score-calculator"
  },
  {
    "name": "Roi Calculator Ad",
    "description": "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns",
    "href": "/roi-calculator-ad"
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
