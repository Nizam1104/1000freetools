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
  title: "Business Loan EMI Calculator",
  description: "Calculate your business loan EMI, total repayment, and interest cost. Includes options for moratorium periods and processing fees for a complete cost picture.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/business-loan-emi-calculator",
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
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/calculators/car-loan-calculator"
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
              <BreadcrumbLink href="/calculators/business-loan-emi-calculator">Business Loan Emi Calculator</BreadcrumbLink>
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
