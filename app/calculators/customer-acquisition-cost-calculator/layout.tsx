import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Customer Acquisition Cost (CAC) Calculator – Find Out How Much Each New Customer Costs",
  description: "Keep your growth profitable by tracking your Customer Acquisition Cost.            Our CAC Calculator divides total sales and marketing spend by the number of            new customers acquired to give you a clear cost-per-customer metric.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/customer-acquisition-cost-calculator",
  },
};

const tools = [
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
