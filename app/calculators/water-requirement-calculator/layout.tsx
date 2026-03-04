import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Water Intake Calculator – How Much Water Should You Drink Per Day?",
  description: "Staying hydrated is vital. Use our water requirement calculator to find your personalized daily water intake goal based on your body weight, exercise habits, and environment.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/water-requirement-calculator",
  },
};

const tools = [
  {
    "name": "Irrigation Water Calculator",
    "description": "Irrigation Water Calculator – Calculate Water Needed for Crop Irrigation",
    "href": "/irrigation-water-calculator"
  },
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Water Intake Calculator – How Much Water Should You Drink Per Day?</h1>
        <p className="text-muted-foreground">Staying hydrated is vital. Use our water requirement calculator to find your personalized daily water intake goal based on your body weight, exercise habits, and environment.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
