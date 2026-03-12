import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Crop Yield Estimator – Predict Your Farm's Harvest Before It Happens",
  description: "Plan ahead with our Crop Yield Estimator. Input plant population, average weight per            unit, and field area to project your total harvest in kg, tons, or bushels per acre.            Useful for market planning, insurance, and farm management.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/crop-yield-estimator",
  },
};

const tools = [
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
  },
  {
    "name": "Soil Ph Adjustment Calculator",
    "description": "Soil pH Adjustment Calculator – How Much Lime or Sulfur to Add to Your Soil",
    "href": "/calculators/soil-ph-adjustment-calculator"
  },
  {
    "name": "Water Requirement Calculator",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
    "href": "/calculators/water-requirement-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/crop-yield-estimator">Crop Yield Estimator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
