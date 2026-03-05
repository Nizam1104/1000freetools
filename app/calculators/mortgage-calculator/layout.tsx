import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Mortgage Calculator – Calculate Monthly Home Loan Payments",
  description: "Estimate your monthly mortgage payment, total interest paid, and full amortization schedule based on home price, down payment, rate, and loan term.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mortgage-calculator",
  },
};

const tools = [
  {
    "name": "Mortgage Amortization Schedule",
    "description": "Mortgage Amortization Schedule Calculator",
    "href": "/mortgage-amortization-schedule"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Mortgage Calculator – Calculate Monthly Home Loan Payments</h1>
        <p className="text-muted-foreground">Estimate your monthly mortgage payment, total interest paid, and full amortization schedule based on home price, down payment, rate, and loan term.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
