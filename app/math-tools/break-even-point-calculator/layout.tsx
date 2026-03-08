import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Break-Even Point Calculator – Find BEP for Your Business",
  description: "Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/break-even-point-calculator",
  },
  openGraph: {
    title: "Break-Even Point Calculator – Find BEP for Your Business",
    description: "Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.",
    type: "website",
    url: "https://1000freetools.com/calculators/break-even-point-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Break-Even Point Calculator – Find BEP for Your Business",
    description: "Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.",
  },
};

const tools = [
  {
    "name": "ROI Calculator – Calculate Return on Investment Online",
    "description": "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
    "href": "/math-tools/roi-calculator"
  },
  {
    "name": "Profit & Loss Calculator – Find Profit or Loss Percentage",
    "description": "Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.",
    "href": "/math-tools/profit-loss-calculator"
  },
  {
    "name": "Simple Interest Calculator – Compute SI Online Instantly",
    "description": "Calculate simple interest, total amount, principal, rate, or time with our free online simple interest calculator. Uses the SI = PRT formula with clear step-by-step results.",
    "href": "/math-tools/simple-interest-calculator"
  },
  {
    "name": "Compound Interest Calculator – Compute CI with Compounding",
    "description": "Calculate compound interest for daily, monthly, quarterly, or annual compounding with our free online calculator. See total interest earned and growth over time with a breakdown.",
    "href": "/math-tools/compound-interest-calculator"
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
