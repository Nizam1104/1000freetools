import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Soil pH Adjustment Calculator – How Much Lime or Sulfur to Add to Your Soil",
  description: "Correct your soil pH for optimal crop growth with our Soil pH Adjustment Calculator.            Enter your current soil pH, target pH, soil type, and field area to calculate the            exact amount of agricultural lime or sulfur to apply.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/soil-ph-adjustment-calculator",
  },
};

const tools = [
  {
    "name": "Ph Calculator",
    "description": "pH Calculator – Calculate pH from H⁺ Concentration",
    "href": "/calculators/ph-calculator"
  },
  {
    "name": "Crop Yield Estimator",
    "description": "Crop Yield Estimator – Predict Your Farm's Harvest Before It Happens",
    "href": "/calculators/crop-yield-estimator"
  },
  {
    "name": "Fertilizer Requirement Calculator",
    "description": "Fertilizer Requirement Calculator – Calculate NPK Fertilizer Dose Per Acre",
    "href": "/calculators/fertilizer-requirement-calculator"
  },
  {
    "name": "Irrigation Water Calculator",
    "description": "Irrigation Water Calculator – Calculate Water Needed for Crop Irrigation",
    "href": "/calculators/irrigation-water-calculator"
  },
  {
    "name": "Pesticide Dilution Calculator",
    "description": "Pesticide Dilution Calculator – Calculate the Right Pesticide-to-Water Ratio",
    "href": "/calculators/pesticide-dilution-calculator"
  },
  {
    "name": "Seed Rate Calculator",
    "description": "Seed Rate Calculator – Calculate Seeds Per Acre for Optimal Crop Yield",
    "href": "/calculators/seed-rate-calculator"
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
