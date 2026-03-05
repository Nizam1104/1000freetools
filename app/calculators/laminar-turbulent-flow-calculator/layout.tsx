import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Laminar/Turbulent Flow Calculator – Flow Regime Calculator",
  description: "Determine if fluid flow is laminar or turbulent based on Reynolds number. Enter flow parameters to analyze flow regime.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/laminar-turbulent-flow-calculator",
  },
};

const tools = [
  {
    "name": "Pipe Flow Reynolds Number Calculator",
    "description": "Reynolds Number Calculator – Pipe Flow Reynolds Number",
    "href": "/pipe-flow-reynolds-number-calculator"
  },
  {
    "name": "Pipe Friction Loss Calculator",
    "description": "Pipe Friction Loss Calculator – Head Loss in Pipe Flow",
    "href": "/pipe-friction-loss-calculator"
  },
  {
    "name": "Head Loss Darcy Weisbach Calculator",
    "description": "Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss",
    "href": "/head-loss-darcy-weisbach-calculator"
  },
  {
    "name": "Manning Equation Calculator",
    "description": "Manning Equation Calculator – Open Channel Flow",
    "href": "/manning-equation-calculator"
  },
  {
    "name": "Water Flow Rate Calculator",
    "description": "Water Flow Rate Calculator – Calculate Flow Rate in Pipes",
    "href": "/water-flow-rate-calculator"
  },
  {
    "name": "Pipe Water Tank Pressure Calculator",
    "description": "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height",
    "href": "/pipe-water-tank-pressure-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Laminar/Turbulent Flow Calculator – Flow Regime Calculator</h1>
        <p className="text-muted-foreground">Determine if fluid flow is laminar or turbulent based on Reynolds number. Enter flow parameters to analyze flow regime.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
