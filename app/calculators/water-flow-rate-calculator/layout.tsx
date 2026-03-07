import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Water Flow Rate Calculator – Calculate Flow Rate in Pipes",
  description: "Determine water or fluid flow rates quickly with our flow rate calculator. Enter pipe diameter and velocity to calculate volumetric flow in liters per second or gallons per minute.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/water-flow-rate-calculator",
  },
};

const tools = [
  {
    "name": "Pipe Water Tank Pressure Calculator",
    "description": "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height",
    "href": "/calculators/pipe-water-tank-pressure-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Water Flow Rate Calculator – Calculate Flow Rate in Pipes</h1>
        <p className="text-muted-foreground">Determine water or fluid flow rates quickly with our flow rate calculator. Enter pipe diameter and velocity to calculate volumetric flow in liters per second or gallons per minute.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
