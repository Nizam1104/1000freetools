import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Irrigation Water Calculator – Calculate Water Needed for Crop Irrigation",
  description: "Optimize water usage on your farm with our Irrigation Water Calculator. Enter crop            type, field size, soil type, and evapotranspiration rate to calculate the precise water            volume needed for efficient irrigation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/irrigation-water-calculator",
  },
};

const tools = [
  {
    "name": "Crop Yield Estimator",
    "description": "Crop Yield Estimator – Predict Your Farm's Harvest Before It Happens",
    "href": "/crop-yield-estimator"
  },
  {
    "name": "Fertilizer Requirement Calculator",
    "description": "Fertilizer Requirement Calculator – Calculate NPK Fertilizer Dose Per Acre",
    "href": "/fertilizer-requirement-calculator"
  },
  {
    "name": "Pesticide Dilution Calculator",
    "description": "Pesticide Dilution Calculator – Calculate the Right Pesticide-to-Water Ratio",
    "href": "/pesticide-dilution-calculator"
  },
  {
    "name": "Seed Rate Calculator",
    "description": "Seed Rate Calculator – Calculate Seeds Per Acre for Optimal Crop Yield",
    "href": "/seed-rate-calculator"
  },
  {
    "name": "Soil Ph Adjustment Calculator",
    "description": "Soil pH Adjustment Calculator – How Much Lime or Sulfur to Add to Your Soil",
    "href": "/soil-ph-adjustment-calculator"
  },
  {
    "name": "Water Requirement Calculator",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
    "href": "/water-requirement-calculator"
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
