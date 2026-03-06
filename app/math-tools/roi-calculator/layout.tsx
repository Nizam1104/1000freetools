import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "ROI Calculator – Calculate Return on Investment Online",
  description: "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/roi-calculator",
  },
  openGraph: {
    title: "ROI Calculator – Calculate Return on Investment Online",
    description: "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/roi-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROI Calculator – Calculate Return on Investment Online",
    description: "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
  },
};

const tools = [
  {
    "name": "Break-Even Point Calculator – Find BEP for Your Business",
    "description": "Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.",
    "href": "/math-tools/break-even-point-calculator"
  },
  {
    "name": "Profit & Loss Calculator – Find Profit or Loss Percentage",
    "description": "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
    "href": "/math-tools/profit-loss-calculator"
  },
  {
    "name": "Compound Interest Calculator – Compute CI with Compounding",
    "description": "Calculate compound interest for daily, monthly, quarterly, or annual compounding with our free online calculator. See total interest earned and growth over time with a breakdown.",
    "href": "/math-tools/compound-interest-calculator"
  },
  {
    "name": "Simple Interest Calculator – Compute SI Online Instantly",
    "description": "Calculate simple interest, total amount, principal, rate, or time with our free online simple interest calculator. Uses the SI = PRT formula with clear step-by-step results.",
    "href": "/math-tools/simple-interest-calculator"
  },
  {
    "name": "Discount & Markup Calculator – Find Sale Price Online",
    "description": "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
    "href": "/math-tools/discount-markup-calculator"
  },
  {
    "name": "Future Value Calculator – Compute FV of Investment Online",
    "description": "Calculate the future value of any investment or savings with our free online future value calculator. Account for compound interest and time to see how your money grows.",
    "href": "/math-tools/future-value-calculator"
  },
  {
    "name": "Present Value Calculator – Compute PV of Future Money",
    "description": "Determine the present value of any future amount with our free online present value calculator. Discount future cash flows to their current worth using any interest rate.",
    "href": "/math-tools/present-value-calculator"
  },
  {
    "name": "Percentage Calculator – Find % of Any Number Instantly",
    "description": "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    "href": "/math-tools/percentage-calculator"
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
