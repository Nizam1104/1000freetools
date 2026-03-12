import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel",
  description: "Pinpoint leaks in your sales pipeline with our Funnel Drop-off Calculator.            Enter the number of users at each funnel stage to calculate conversion and            drop-off rates — enabling targeted optimization for maximum revenue.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/funnel-drop-off-calculator",
  },
};

const tools = [
  {
    "name": "Customer Acquisition Cost Calculator",
    "description": "Customer Acquisition Cost (CAC) Calculator – Find Out How Much Each New Customer Costs",
    "href": "/calculators/customer-acquisition-cost-calculator"
  },
  {
    "name": "Customer Lifetime Value Calculator",
    "description": "Customer Lifetime Value (CLV) Calculator – Measure Customer Worth",
    "href": "/calculators/customer-lifetime-value-calculator"
  },
  {
    "name": "Cpc Cpm Ctr Calculator",
    "description": "CPC, CPM & CTR Calculator – Measure Your Digital Ad Campaign Performance",
    "href": "/calculators/cpc-cpm-ctr-calculator"
  },
  {
    "name": "Nps Score Calculator",
    "description": "NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results",
    "href": "/calculators/nps-score-calculator"
  },
  {
    "name": "Lead Conversion Calculator",
    "description": "Lead Conversion Calculator – Calculate Your Sales Conversion Rate & Cost Per Lead",
    "href": "/calculators/lead-conversion-calculator"
  },
  {
    "name": "Roi Calculator Ad",
    "description": "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns",
    "href": "/calculators/roi-calculator-ad"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/funnel-drop-off-calculator">Funnel Drop Off Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
