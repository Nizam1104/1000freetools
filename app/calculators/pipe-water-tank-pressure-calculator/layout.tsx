import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height",
  description: "Calculate water pressure at any point in your pipe system with our Tank Pressure Calculator.            Enter the height of the water column to determine static pressure in PSI, bar, or kPa —            essential for plumbing design and water system planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pipe-water-tank-pressure-calculator",
  },
};

const tools = [
  {
    "name": "Water Flow Rate Calculator",
    "description": "Water Flow Rate Calculator – Calculate Flow Rate in Pipes",
    "href": "/calculators/water-flow-rate-calculator"
  },
  {
    "name": "Water Tank Volume Calculator",
    "description": "Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons",
    "href": "/calculators/water-tank-volume-calculator"
  },
  {
    "name": "Pipe Flow Reynolds Number Calculator",
    "description": "Reynolds Number Calculator – Pipe Flow Reynolds Number",
    "href": "/calculators/pipe-flow-reynolds-number-calculator"
  },
  {
    "name": "Pipe Friction Loss Calculator",
    "description": "Pipe Friction Loss Calculator – Head Loss in Pipe Flow",
    "href": "/calculators/pipe-friction-loss-calculator"
  },
  {
    "name": "Head Loss Darcy Weisbach Calculator",
    "description": "Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss",
    "href": "/calculators/head-loss-darcy-weisbach-calculator"
  },
  {
    "name": "Manning Equation Calculator",
    "description": "Manning Equation Calculator – Open Channel Flow",
    "href": "/calculators/manning-equation-calculator"
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
