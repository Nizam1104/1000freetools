import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Discount & Markup Calculator – Find Sale Price Online",
  description: "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/discount-markup-calculator",
  },
  openGraph: {
    title: "Discount & Markup Calculator – Find Sale Price Online",
    description: "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
    type: "website",
    url: "https://1000freetools.com/math-tools/discount-markup-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discount & Markup Calculator – Find Sale Price Online",
    description: "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
  },
};

const tools = [
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
    "name": "Sales Tax & VAT Calculator – Compute Tax Amount Online",
    "description": "Calculate sales tax or VAT on any purchase with our free online tax calculator. Enter price and tax rate to find the tax amount and total price including tax.",
    "href": "/math-tools/sales-tax-vat-calculator"
  },
  {
    "name": "Tip Calculator – Calculate Tip & Split Bill Online",
    "description": "Calculate the perfect tip and split your restaurant bill with our free online tip calculator. Enter bill amount, tip percentage, and number of people to split for instant results.",
    "href": "/math-tools/tip-calculator"
  },
  {
    "name": "Profit & Loss Calculator – Find Profit or Loss Percentage",
    "description": "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
    "href": "/math-tools/profit-loss-calculator"
  },
  {
    "name": "ROI Calculator – Calculate Return on Investment Online",
    "description": "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
    "href": "/math-tools/roi-calculator"
  },
  {
    "name": "Simple Interest Calculator – Compute SI Online Instantly",
    "description": "Calculate simple interest, total amount, principal, rate, or time with our free online simple interest calculator. Uses the SI = PRT formula with clear step-by-step results.",
    "href": "/math-tools/simple-interest-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
