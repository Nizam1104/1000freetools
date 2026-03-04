import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Cargo Volume Calculator – Calculate Total Shipment Volume & Chargeable Weight",
  description: "Plan and price your freight accurately with our Cargo Volume Calculator.            Enter dimensions and quantities for multiple package types to calculate total            cargo volume in CBM and chargeable weight — supporting air, ocean, and road freight planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cargo-volume-calculator",
  },
};

const tools = [
  {
    "name": "Canvas Aspect Ratio Calculator",
    "description": "Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions",
    "href": "/canvas-aspect-ratio-calculator"
  },
  {
    "name": "Car Loan Affordability Calculator",
    "description": "Car Loan Affordability Calculator – Find Out What Car You Can Afford",
    "href": "/car-loan-affordability-calculator"
  },
  {
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/car-loan-calculator"
  },
  {
    "name": "Carb Intake Calculator",
    "description": "Carb Intake Calculator – Daily Carbohydrate Needs Calculator",
    "href": "/carb-intake-calculator"
  },
  {
    "name": "Carbon Footprint Calculator",
    "description": "Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint",
    "href": "/carbon-footprint-calculator"
  },
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/carpet-area-calculator"
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
