import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Weight Distribution Calculator – Calculate Load Distribution Across Axles & Points",
  description: "Ensure safe load distribution with our Weight Distribution Calculator.            Enter total load weight and distance from each support point or axle to calculate            the weight carried at each point — essential for truck loading, trailer towing,            and structural engineering.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/weight-distribution-calculator",
  },
};

const tools = [
  {
    "name": "Water Requirement Calculator",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
    "href": "/water-requirement-calculator"
  },
  {
    "name": "Water Tank Volume Calculator",
    "description": "Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons",
    "href": "/water-tank-volume-calculator"
  },
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/wavelength-calculator"
  },
  {
    "name": "Wealth Growth Projection Calculator",
    "description": "Wealth Growth Projection Calculator",
    "href": "/wealth-growth-projection-calculator"
  },
  {
    "name": "Week Number Calculator",
    "description": "Week Number Calculator – Find ISO Week Number for Any Date",
    "href": "/week-number-calculator"
  },
  {
    "name": "Weight Loss Time Calculator",
    "description": "Weight Loss Time Calculator – How Long Will It Take to Lose Weight?",
    "href": "/weight-loss-time-calculator"
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
