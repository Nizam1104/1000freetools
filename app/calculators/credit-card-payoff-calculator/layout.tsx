import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator",
  description: "Find out when you'll be debt-free and how much interest you'll pay. Enter your balance, interest rate, and fixed monthly payment to plan your payoff.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/credit-card-payoff-calculator",
  },
};

const tools = [
  {
    "name": "Minimum Payment Calculator",
    "description": "Credit Card Minimum Payment Calculator",
    "href": "/calculators/minimum-payment-calculator"
  },
  {
    "name": "Debt To Income Ratio Calculator",
    "description": "Debt-to-Income Ratio Calculator",
    "href": "/calculators/debt-to-income-ratio-calculator"
  },
  {
    "name": "Interest Rate Finder Calculator",
    "description": "Interest Rate Finder Calculator",
    "href": "/calculators/interest-rate-finder-calculator"
  },
  {
    "name": "Interest Vs Principal Split Calculator",
    "description": "Interest vs Principal Split Calculator",
    "href": "/calculators/interest-vs-principal-split-calculator"
  },
  {
    "name": "Loan Payoff Time Calculator",
    "description": "Loan Payoff Time Calculator",
    "href": "/calculators/loan-payoff-time-calculator"
  },
  {
    "name": "Loan Prepayment Impact Calculator",
    "description": "Loan Prepayment Impact Calculator",
    "href": "/calculators/loan-prepayment-impact-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/credit-card-payoff-calculator">Credit Card Payoff Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
