import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Percentage Calculator – Calculate Percentages Instantly",
  description: "Calculate percentages, find what percent one number is of another, or compute percentage change. Our free percentage calculator handles all common percentage calculations with clear results.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/percentage-calculator",
  },
};

const tools = [
  {
    "name": "Percentage Change Calculator",
    "description": "Percentage Change Calculator",
    "href": "/calculators/percentage-change-calculator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/calculators/average-calculator"
  },
  {
    "name": "Median Calculator",
    "description": "Median Calculator",
    "href": "/calculators/median-calculator"
  },
  {
    "name": "Mode Calculator",
    "description": "Mode Calculator",
    "href": "/calculators/mode-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/calculators/weighted-average-calculator"
  },
  {
    "name": "Discount Calculator",
    "description": "Discount Calculator – Calculate Sale Price & Savings",
    "href": "/calculators/discount-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Percentage Calculator – Calculate Percentages Instantly</h1>
        <p className="text-muted-foreground">Calculate percentages, find what percent one number is of another, or compute percentage change. Our free percentage calculator handles all common percentage calculations with clear results.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
