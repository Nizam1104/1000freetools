import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Loan Amortization Visualizer",
  description: "See your entire loan journey at a glance. An interactive visual chart shows your loan balance declining over time alongside cumulative principal and interest paid.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/loan-amortization-visualizer",
  },
};

const tools = [
  {
    "name": "Mortgage Amortization Schedule",
    "description": "Mortgage Amortization Schedule Calculator",
    "href": "/mortgage-amortization-schedule"
  },
  {
    "name": "Loan Emi Calculator",
    "description": "Loan EMI Calculator – Calculate Monthly Loan Payments",
    "href": "/loan-emi-calculator"
  },
  {
    "name": "Loan Payoff Time Calculator",
    "description": "Loan Payoff Time Calculator",
    "href": "/loan-payoff-time-calculator"
  },
  {
    "name": "Loan Prepayment Impact Calculator",
    "description": "Loan Prepayment Impact Calculator",
    "href": "/loan-prepayment-impact-calculator"
  },
  {
    "name": "Loan Refinancing Calculator",
    "description": "Loan Refinancing Calculator",
    "href": "/loan-refinancing-calculator"
  },
  {
    "name": "Business Loan Emi Calculator",
    "description": "Business Loan EMI Calculator",
    "href": "/business-loan-emi-calculator"
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
