import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Future Value Calculator – Compute FV of Investment Online",
  description: "Calculate the future value of any investment or savings with our free online future value calculator. Account for compound interest and time to see how your money grows.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/future-value-calculator",
  },
  openGraph: {
    title: "Future Value Calculator – Compute FV of Investment Online",
    description: "Calculate the future value of any investment or savings with our free online future value calculator. Account for compound interest and time to see how your money grows.",
    type: "website",
    url: "https://1000freetools.com/math-tools/future-value-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Value Calculator – Compute FV of Investment Online",
    description: "Calculate the future value of any investment or savings with our free online future value calculator. Account for compound interest and time to see how your money grows.",
  },
};

const tools = [
  {
    "name": "Present Value Calculator – Compute PV of Future Money",
    "description": "Determine the present value of any future amount with our free online present value calculator. Discount future cash flows to their current worth using any interest rate.",
    "href": "/math-tools/present-value-calculator"
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
    "name": "Annuity Calculator – Compute Annuity Payments Online",
    "description": "Calculate annuity payments, present value, or future value with our free online annuity calculator. Covers ordinary annuities and annuities due with complete financial breakdowns.",
    "href": "/math-tools/annuity-calculator"
  },
  {
    "name": "EMI Calculator – Calculate Monthly Loan EMI Online",
    "description": "Calculate your monthly EMI for any loan with our free online EMI calculator. Enter principal, interest rate, and loan tenure to get the exact monthly payment and total interest paid.",
    "href": "/math-tools/emi-loan-calculator"
  },
  {
    "name": "Simple Interest Calculator – Compute SI Online Instantly",
    "description": "Calculate simple interest, total amount, principal, rate, or time with our free online simple interest calculator. Uses the SI = PRT formula with clear step-by-step results.",
    "href": "/math-tools/simple-interest-calculator"
  },
  {
    "name": "ROI Calculator – Calculate Return on Investment Online",
    "description": "Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.",
    "href": "/math-tools/roi-calculator"
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
