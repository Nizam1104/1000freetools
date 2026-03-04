import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Shoe Size Converter – Convert Shoe Sizes Between US, UK, EU & CM",
  description: "Shop shoes from any country with confidence using our Shoe Size Converter.            Instantly convert between US, UK, European, and centimeter shoe sizes for            men, women, and children — eliminating sizing confusion when shopping            internationally or online.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/shoe-size-converter",
  },
};

const tools = [
  {
    "name": "Ring Size Calculator",
    "description": "Ring Size Calculator – Find Your Ring Size in US, UK & EU Sizes",
    "href": "/ring-size-calculator"
  },
  {
    "name": "Clothing Shrinkage Estimator",
    "description": "Clothing Shrinkage Estimator – Predict How Much Your Clothes Will Shrink",
    "href": "/clothing-shrinkage-estimator"
  },
  {
    "name": "Laundry Detergent Calculator",
    "description": "Laundry Detergent Calculator – How Much Detergent Should You Use Per Wash?",
    "href": "/laundry-detergent-calculator"
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
