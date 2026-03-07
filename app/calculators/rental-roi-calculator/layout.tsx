import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rental ROI Calculator – Calculate Return on Investment for Rental Properties",
  description: "Evaluate the profitability of rental properties with our free rental ROI calculator. Factor in purchase price, monthly rent, expenses, and loan costs to calculate annual return on investment. Essential for real estate investors and landlords.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rental-roi-calculator",
  },
};

const tools = [
  {
    "name": "Rent Per Square Foot Calculator",
    "description": "Rent per Square Foot Calculator – Compare Property Rental Rates",
    "href": "/calculators/rent-per-square-foot-calculator"
  },
  {
    "name": "Rental Yield Calculator",
    "description": "Rental Yield Calculator",
    "href": "/calculators/rental-yield-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Rental ROI Calculator – Calculate Return on Investment for Rental Properties</h1>
        <p className="text-muted-foreground">Evaluate the profitability of rental properties with our free rental ROI calculator. Factor in purchase price, monthly rent, expenses, and loan costs to calculate annual return on investment. Essential for real estate investors and landlords.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
