import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CPC, CPM & CTR Calculator – Measure Your Digital Ad Campaign Performance",
  description: "Analyze the effectiveness of your online ads with our CPC/CPM/CTR Calculator.            Enter impressions, clicks, and spend to instantly calculate cost per click,            cost per thousand impressions, and click-through rate — essential metrics for            Google Ads, Facebook Ads, and more.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cpc-cpm-ctr-calculator",
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
    "name": "Nps Score Calculator",
    "description": "NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results",
    "href": "/nps-score-calculator"
  },
  {
    "name": "Lead Conversion Calculator",
    "description": "Lead Conversion Calculator – Calculate Your Sales Conversion Rate & Cost Per Lead",
    "href": "/lead-conversion-calculator"
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
