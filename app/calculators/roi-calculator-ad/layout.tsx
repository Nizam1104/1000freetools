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
  title: "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns",
  description: "Measure the profitability of your advertising with our Ad ROI Calculator.            Enter your total ad spend and revenue generated to calculate ROI percentage —            helping marketers and business owners make smarter advertising budget decisions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/roi-calculator-ad",
  },
};

const tools = [
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/calculators/roi-calculator"
  },
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
    "name": "Funnel Drop Off Calculator",
    "description": "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel",
    "href": "/calculators/funnel-drop-off-calculator"
  },
  {
    "name": "Nps Score Calculator",
    "description": "NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results",
    "href": "/calculators/nps-score-calculator"
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
              <BreadcrumbLink href="/calculators/roi-calculator-ad">Roi Calculator Ad</BreadcrumbLink>
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
