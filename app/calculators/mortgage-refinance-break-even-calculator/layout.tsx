import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Mortgage Refinance Break-Even Calculator",
  description: "Is refinancing worth it? Calculate the number of months your monthly savings will take to offset closing costs and determine your refinance break-even point.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mortgage-refinance-break-even-calculator",
  },
};

const tools = [
  {
    "name": "Mortgage Calculator",
    "description": "Mortgage Calculator – Calculate Monthly Home Loan Payments",
    "href": "/mortgage-calculator"
  },
  {
    "name": "Mortgage Amortization Schedule",
    "description": "Mortgage Amortization Schedule Calculator",
    "href": "/mortgage-amortization-schedule"
  },
  {
    "name": "Loan Refinancing Calculator",
    "description": "Loan Refinancing Calculator",
    "href": "/loan-refinancing-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Mortgage Refinance Break-Even Calculator</h1>
        <p className="text-muted-foreground">Is refinancing worth it? Calculate the number of months your monthly savings will take to offset closing costs and determine your refinance break-even point.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
