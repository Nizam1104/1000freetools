import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rental Yield Calculator",
  description: "Evaluate a rental property&apos;s performance. Calculate gross and net rental yield based on purchase price, annual rental income, and operating expenses.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rental-yield-calculator",
  },
};

const tools = [
  {
    "name": "Rent Per Square Foot Calculator",
    "description": "Rent per Square Foot Calculator – Compare Property Rental Rates",
    "href": "/calculators/rent-per-square-foot-calculator"
  },
  {
    "name": "Rental Roi Calculator",
    "description": "Rental ROI Calculator – Calculate Return on Investment for Rental Properties",
    "href": "/calculators/rental-roi-calculator"
  },
  {
    "name": "Buy Vs Rent Calculator",
    "description": "Buy vs Rent Calculator",
    "href": "/calculators/buy-vs-rent-calculator"
  },
  {
    "name": "Housing Affordability Calculator",
    "description": "Housing Affordability Calculator",
    "href": "/calculators/housing-affordability-calculator"
  },
  {
    "name": "Mortgage Calculator",
    "description": "Mortgage Calculator – Calculate Monthly Home Loan Payments",
    "href": "/calculators/mortgage-calculator"
  },
  {
    "name": "Mortgage Amortization Schedule",
    "description": "Mortgage Amortization Schedule Calculator",
    "href": "/calculators/mortgage-amortization-schedule"
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
