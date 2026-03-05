import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "SaaS Churn Rate Calculator – Calculate Monthly & Annual Customer Churn",
  description: "Track subscriber retention with our SaaS Churn Rate Calculator. Enter customers at the start of the period and customers lost to calculate monthly or annual churn rate — a critical metric for subscription business health and growth forecasting.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/saas-churn-rate-calculator",
  },
};

const tools = [
  {
    "name": "Saas Mrr Arr Calculator",
    "description": "MRR & ARR Calculator – Calculate Monthly and Annual Recurring Revenue for SaaS",
    "href": "/saas-mrr-arr-calculator"
  },
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
    "name": "Subscription Pricing Calculator",
    "description": "Subscription Pricing Calculator – Find the Right Price for Your Subscription Plans",
    "href": "/subscription-pricing-calculator"
  },
  {
    "name": "Subscription Profit Calculator",
    "description": "Subscription Business Profit Calculator",
    "href": "/subscription-profit-calculator"
  },
  {
    "name": "Funnel Drop Off Calculator",
    "description": "Funnel Drop-off Calculator – Identify Where You&apos;re Losing Customers in Your Sales Funnel",
    "href": "/funnel-drop-off-calculator"
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
