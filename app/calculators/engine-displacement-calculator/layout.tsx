import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Engine Displacement Calculator – Calculate CC & Liter Capacity from Bore & Stroke",
  description: "Calculate your engine's total displacement in cc or liters using bore, stroke, and            cylinder count with our Engine Displacement Calculator. Ideal for mechanics, car            enthusiasts, and performance tuning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/engine-displacement-calculator",
  },
};

const tools = [
  {
    "name": "Emi Breakup Visualizer",
    "description": "EMI Breakup Visualizer",
    "href": "/calculators/emi-breakup-visualizer"
  },
  {
    "name": "Emi For Home Loan Calculator",
    "description": "Home Loan EMI Calculator – Calculate Monthly EMI and Interest",
    "href": "/calculators/emi-for-home-loan-calculator"
  },
  {
    "name": "Empirical Formula Calculator",
    "description": "Empirical Formula Calculator – Find Empirical Formula from Percent Composition",
    "href": "/calculators/empirical-formula-calculator"
  },
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/calculators/energy-calculator"
  },
  {
    "name": "Energy Consumption Breakdown Calculator",
    "description": "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used",
    "href": "/calculators/energy-consumption-breakdown-calculator"
  },
  {
    "name": "Entropy Calculator",
    "description": "Entropy Calculator – Calculate Password & Data Entropy in Bits",
    "href": "/calculators/entropy-calculator"
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
