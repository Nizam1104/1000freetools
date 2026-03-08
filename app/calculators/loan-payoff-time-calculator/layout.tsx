import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Loan Payoff Time Calculator",
  description: "Find out exactly how long it will take to become debt-free. Enter your loan balance, interest rate, and fixed monthly payment to see your payoff timeline.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/loan-payoff-time-calculator",
  },
};

const tools = [
  {
    "name": "Loan Emi Calculator",
    "description": "Loan EMI Calculator – Calculate Monthly Loan Payments",
    "href": "/calculators/loan-emi-calculator"
  },
  {
    "name": "Loan Amortization Visualizer",
    "description": "Loan Amortization Visualizer",
    "href": "/calculators/loan-amortization-visualizer"
  },
  {
    "name": "Loan Prepayment Impact Calculator",
    "description": "Loan Prepayment Impact Calculator",
    "href": "/calculators/loan-prepayment-impact-calculator"
  },
  {
    "name": "Loan Refinancing Calculator",
    "description": "Loan Refinancing Calculator",
    "href": "/calculators/loan-refinancing-calculator"
  },
  {
    "name": "Business Loan Emi Calculator",
    "description": "Business Loan EMI Calculator",
    "href": "/calculators/business-loan-emi-calculator"
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
