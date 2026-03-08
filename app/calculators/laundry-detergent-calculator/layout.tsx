import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Laundry Detergent Calculator – How Much Detergent Should You Use Per Wash?",
  description: "Stop guessing and start using the right amount of laundry detergent with our            Laundry Detergent Calculator. Based on your load size, machine type, and water            hardness, get the perfect detergent dose every time to save money and protect your clothes.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/laundry-detergent-calculator",
  },
};

const tools = [
  {
    "name": "Clothing Shrinkage Estimator",
    "description": "Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink",
    "href": "/calculators/clothing-shrinkage-estimator"
  },
  {
    "name": "Shoe Size Converter",
    "description": "Shoe Size Converter – Convert Shoe Sizes Between US, UK, EU & CM",
    "href": "/calculators/shoe-size-converter"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/calculators/50-30-20-budget-rule-calculator"
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
