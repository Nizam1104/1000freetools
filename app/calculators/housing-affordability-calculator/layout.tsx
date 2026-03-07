import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Housing Affordability Calculator",
  description: "Find out how much home you can afford. Based on your income, existing debts, down payment, and standard lending ratios to give you a realistic price range.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/housing-affordability-calculator",
  },
};

const tools = [
  {
    "name": "Buy Vs Rent Calculator",
    "description": "Buy vs Rent Calculator",
    "href": "/calculators/buy-vs-rent-calculator"
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
  },
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
    "name": "Rental Yield Calculator",
    "description": "Rental Yield Calculator",
    "href": "/calculators/rental-yield-calculator"
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
