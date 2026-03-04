import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Mortgage Amortization Schedule Calculator",
  description: "Generate a complete month-by-month amortization table for your mortgage. See opening balance, EMI, principal paid, interest paid, and closing balance for every payment.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mortgage-amortization-schedule",
  },
};

const tools = [
  {
    "name": "Mortgage Calculator",
    "description": "Mortgage Calculator – Calculate Monthly Home Loan Payments",
    "href": "/mortgage-calculator"
  },
  {
    "name": "Loan Amortization Visualizer",
    "description": "Loan Amortization Visualizer",
    "href": "/loan-amortization-visualizer"
  },
  {
    "name": "Mortgage Refinance Break Even Calculator",
    "description": "Mortgage Refinance Break-Even Calculator",
    "href": "/mortgage-refinance-break-even-calculator"
  },
  {
    "name": "Buy Vs Rent Calculator",
    "description": "Buy vs Rent Calculator",
    "href": "/buy-vs-rent-calculator"
  },
  {
    "name": "Housing Affordability Calculator",
    "description": "Housing Affordability Calculator",
    "href": "/housing-affordability-calculator"
  },
  {
    "name": "Rent Per Square Foot Calculator",
    "description": "Rent per Square Foot Calculator – Compare Property Rental Rates",
    "href": "/rent-per-square-foot-calculator"
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
