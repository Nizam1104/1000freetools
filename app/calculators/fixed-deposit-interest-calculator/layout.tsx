import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Fixed Deposit (FD) Interest Calculator",
  description: "Calculate the maturity amount and total interest earned on your fixed deposit. Enter principal, interest rate, tenure, and compounding frequency for precise results.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/fixed-deposit-interest-calculator",
  },
};

const tools = [
  {
    "name": "Recurring Deposit Calculator",
    "description": "Recurring Deposit (RD) Calculator",
    "href": "/recurring-deposit-calculator"
  },
  {
    "name": "Simple Interest Calculator",
    "description": "Simple Interest Calculator",
    "href": "/simple-interest-calculator"
  },
  {
    "name": "Compound Interest Calculator",
    "description": "Compound Interest Calculator",
    "href": "/compound-interest-calculator"
  },
  {
    "name": "Compounding Frequency Comparison",
    "description": "Compounding Frequency Comparison Calculator",
    "href": "/compounding-frequency-comparison"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/future-value-calculator"
  },
  {
    "name": "Present Value Calculator",
    "description": "Present Value Calculator",
    "href": "/present-value-calculator"
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
