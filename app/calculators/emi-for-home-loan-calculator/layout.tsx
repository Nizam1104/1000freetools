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
  title: "Home Loan EMI Calculator – Calculate Monthly EMI and Interest",
  description: "Calculate your monthly home loan EMI, total interest, and repayment schedule with our free home loan EMI calculator. Enter loan amount, interest rate, and tenure for instant results. Essential for home buyers comparing mortgage options.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/emi-for-home-loan-calculator",
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
    "name": "Loan Payoff Time Calculator",
    "description": "Loan Payoff Time Calculator",
    "href": "/calculators/loan-payoff-time-calculator"
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
                    <BreadcrumbLink href="/calculators/emi-for-home-loan-calculator">Emi For Home Loan Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Home Loan EMI Calculator – Calculate Monthly EMI and Interest</h1>
        <p className="text-muted-foreground">Calculate your monthly home loan EMI, total interest, and repayment schedule with our free home loan EMI calculator. Enter loan amount, interest rate, and tenure for instant results. Essential for home buyers comparing mortgage options.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
