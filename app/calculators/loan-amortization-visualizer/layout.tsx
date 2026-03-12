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
    "href": "/calculators/mortgage-amortization-schedule"
  },
  {
    "name": "Loan Emi Calculator",
    "description": "Loan EMI Calculator – Calculate Monthly Loan Payments",
    "href": "/calculators/loan-emi-calculator"
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
              <BreadcrumbLink href="/calculators/loan-amortization-visualizer">Loan Amortization Visualizer</BreadcrumbLink>
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
