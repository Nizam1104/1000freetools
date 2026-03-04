import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Interest Rate Finder Calculator",
  description: "Don&apos;t know your loan&apos;s interest rate? Reverse-calculate the implied annual rate from your known principal, monthly payment, and loan tenure.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/interest-rate-finder-calculator",
  },
};

const tools = [
  {
    "name": "Interest Vs Principal Split Calculator",
    "description": "Interest vs Principal Split Calculator",
    "href": "/interest-vs-principal-split-calculator"
  },
  {
    "name": "Credit Card Payoff Calculator",
    "description": "Credit Card Payoff Calculator",
    "href": "/credit-card-payoff-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/debt-to-income-ratio-calculator"
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
