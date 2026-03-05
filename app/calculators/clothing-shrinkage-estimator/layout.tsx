import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink",
  description: "Avoid ruining your clothes with our Clothing Shrinkage Estimator.            Enter fabric type, washing temperature, and garment dimensions to predict            post-wash shrinkage — helping you buy the right size and care for your wardrobe.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/clothing-shrinkage-estimator",
  },
};

const tools = [
  {
    "name": "Shoe Size Converter",
    "description": "Shoe Size Converter – Convert Shoe Sizes Between US, UK, EU & CM",
    "href": "/shoe-size-converter"
  },
  {
    "name": "Laundry Detergent Calculator",
    "description": "Laundry Detergent Calculator – How Much Detergent Should You Use Per Wash?",
    "href": "/laundry-detergent-calculator"
  },
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/flooring-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/4-percent-rule-retirement-calculator"
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
