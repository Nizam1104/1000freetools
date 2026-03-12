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
  title: "Profit & Loss Calculator – Find Profit or Loss Percentage",
  description: "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/profit-loss-calculator",
  },
  openGraph: {
    title: "Profit & Loss Calculator – Find Profit or Loss Percentage",
    description: "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
    type: "website",
    url: "https://1000freetools.com/math-tools/profit-loss-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profit & Loss Calculator – Find Profit or Loss Percentage",
    description: "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
  },
};

const tools = [
  {
    "name": "ROI Calculator – Calculate Return on Investment Online",
    "description": "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
    "href": "/math-tools/roi-calculator"
  },
  {
    "name": "Break-Even Point Calculator – Find BEP for Your Business",
    "description": "Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.",
    "href": "/math-tools/break-even-point-calculator"
  },
  {
    "name": "Compound Interest Calculator – Compute CI with Compounding",
    "description": "Calculate compound interest for daily, monthly, quarterly, or annual compounding with our free online calculator. See total interest earned and growth over time with a breakdown.",
    "href": "/math-tools/compound-interest-calculator"
  },
  {
    "name": "Discount & Markup Calculator – Find Sale Price Online",
    "description": "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
    "href": "/math-tools/discount-markup-calculator"
  },
  {
    "name": "Percentage Calculator – Find % of Any Number Instantly",
    "description": "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    "href": "/math-tools/percentage-calculator"
  },
  {
    "name": "Percentage Change Calculator – Find % Increase or Decrease",
    "description": "Calculate the percentage change between any two values with our free online percentage change calculator. Instantly find percentage increase or decrease with the formula shown.",
    "href": "/math-tools/percentage-change-calculator"
  },
  {
    "name": "Tip Calculator – Calculate Tip & Split Bill Online",
    "description": "Calculate the perfect tip and split your restaurant bill with our free online tip calculator. Enter bill amount, tip percentage, and number of people to split for instant results.",
    "href": "/math-tools/tip-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
              <BreadcrumbLink href="/math-tools/profit-loss-calculator">Profit Loss Calculator</BreadcrumbLink>
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
