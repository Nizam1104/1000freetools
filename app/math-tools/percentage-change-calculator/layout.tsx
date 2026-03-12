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
  title: "Percentage Change Calculator – Find % Increase or Decrease",
  description: "Calculate the percentage change between any two values with our free online percentage change calculator. Instantly find percentage increase or decrease with the formula shown.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/percentage-change-calculator",
  },
  openGraph: {
    title: "Percentage Change Calculator – Find % Increase or Decrease",
    description: "Calculate the percentage change between any two values with our free online percentage change calculator. Instantly find percentage increase or decrease with the formula shown.",
    type: "website",
    url: "https://1000freetools.com/calculators/percentage-change-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Change Calculator – Find % Increase or Decrease",
    description: "Calculate the percentage change between any two values with our free online percentage change calculator. Instantly find percentage increase or decrease with the formula shown.",
  },
};

const tools = [
  {
    "name": "Percentage Calculator – Find % of Any Number Instantly",
    "description": "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    "href": "/math-tools/percentage-calculator"
  },
  {
    "name": "Discount & Markup Calculator – Find Sale Price Online",
    "description": "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
    "href": "/math-tools/discount-markup-calculator"
  },
  {
    "name": "Profit & Loss Calculator – Find Profit or Loss Percentage",
    "description": "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
    "href": "/math-tools/profit-loss-calculator"
  },
  {
    "name": "Sales Tax & VAT Calculator – Compute Tax Amount Online",
    "description": "Calculate sales tax or VAT on any purchase with our free online tax calculator. Enter price and tax rate to find the tax amount and total price including tax.",
    "href": "/math-tools/sales-tax-vat-calculator"
  },
  {
    "name": "GPA Calculator – Calculate Your Grade & GPA Online",
    "description": "Calculate your GPA and overall grade from multiple subject scores and credit hours with our free online GPA calculator. Supports weighted and unweighted GPA calculations.",
    "href": "/math-tools/gpa-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Simple Interest Calculator – Compute SI Online Instantly",
    "description": "Calculate simple interest, total amount, principal, rate, or time with our free online simple interest calculator. Uses the SI = PRT formula with clear step-by-step results.",
    "href": "/math-tools/simple-interest-calculator"
  },
  {
    "name": "Ratio Calculator – Simplify & Solve Ratios Online",
    "description": "Simplify ratios and solve ratio problems instantly with our free online ratio calculator. Solve for missing values in proportions and reduce ratios to their simplest form.",
    "href": "/math-tools/ratio-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/percentage-change-calculator">Percentage Change Calculator</BreadcrumbLink>
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
