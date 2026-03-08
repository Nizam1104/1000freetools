import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Discount Stacking Calculator – Calculate Final Price After Multiple Discounts",
  description: "Apply multiple discounts and see your true savings with our Discount Stacking            Calculator. Whether it's a coupon plus a sale, or tiered pricing, instantly calculate            the final price after stacking all discounts.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/discount-stacking-calculator",
  },
};

const tools = [
  {
    "name": "Discount Calculator",
    "description": "Discount Calculator – Calculate Sale Price & Savings",
    "href": "/calculators/discount-calculator"
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
