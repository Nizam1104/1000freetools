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
  title: "Subscription Pricing Calculator – Find the Right Price for Your Subscription Plans",
  description: "Set the right subscription price with our Subscription Pricing Calculator.            Factor in your costs, desired profit margin, and customer distribution to determine            optimal monthly and annual pricing tiers for your SaaS or membership business.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/subscription-pricing-calculator",
  },
};

const tools = [
  {
    "name": "Subscription Profit Calculator",
    "description": "Subscription Business Profit Calculator",
    "href": "/calculators/subscription-profit-calculator"
  },
  {
    "name": "Saas Churn Rate Calculator",
    "description": "SaaS Churn Rate Calculator – Calculate Monthly & Annual Customer Churn",
    "href": "/calculators/saas-churn-rate-calculator"
  },
  {
    "name": "Saas Mrr Arr Calculator",
    "description": "MRR & ARR Calculator – Calculate Monthly and Annual Recurring Revenue for SaaS",
    "href": "/calculators/saas-mrr-arr-calculator"
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
    "name": "Funnel Drop Off Calculator",
    "description": "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel",
    "href": "/calculators/funnel-drop-off-calculator"
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
              <BreadcrumbLink href="/calculators/subscription-pricing-calculator">Subscription Pricing Calculator</BreadcrumbLink>
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
