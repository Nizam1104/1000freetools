import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Discount Calculator – Calculate Sale Price & Savings",
  description: "Instantly find the sale price, amount saved, and percentage off for any discount. Perfect for shopping, pricing, and deal comparisons.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/discount-calculator",
  },
};

const tools = [
  {
    "name": "Discount Stacking Calculator",
    "description": "Discount Stacking Calculator – Calculate Final Price After Multiple Discounts",
    "href": "/calculators/discount-stacking-calculator"
  },
  {
    "name": "Percentage Calculator",
    "description": "Percentage Calculator – Calculate Percentages Instantly",
    "href": "/calculators/percentage-calculator"
  },
  {
    "name": "Percentage Change Calculator",
    "description": "Percentage Change Calculator",
    "href": "/calculators/percentage-change-calculator"
  },
  {
    "name": "Break Even Discount Calculator",
    "description": "Break-Even Discount Calculator",
    "href": "/calculators/break-even-discount-calculator"
  },
  {
    "name": "Break Even Point Calculator",
    "description": "Break-Even Point Calculator",
    "href": "/calculators/break-even-point-calculator"
  },
  {
    "name": "Margin Calculator",
    "description": "Profit Margin Calculator",
    "href": "/calculators/margin-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Discount Calculator – Calculate Sale Price & Savings</h1>
        <p className="text-muted-foreground">Instantly find the sale price, amount saved, and percentage off for any discount. Perfect for shopping, pricing, and deal comparisons.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
