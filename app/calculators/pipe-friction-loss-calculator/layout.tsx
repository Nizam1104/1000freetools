import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pipe Friction Loss Calculator – Head Loss in Pipe Flow",
  description: "Calculate pressure or head loss due to friction in pipes. Our pipe friction loss calculator uses the Darcy-Weisbach equation for accurate results in water and fluid systems.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pipe-friction-loss-calculator",
  },
};

const tools = [
  {
    "name": "Pipe Flow Reynolds Number Calculator",
    "description": "Reynolds Number Calculator – Pipe Flow Reynolds Number",
    "href": "/calculators/pipe-flow-reynolds-number-calculator"
  },
  {
    "name": "Head Loss Darcy Weisbach Calculator",
    "description": "Head Loss (Darcy-Weisbach) Calculator – Pipe Friction Loss",
    "href": "/calculators/head-loss-darcy-weisbach-calculator"
  },
  {
    "name": "Laminar Turbulent Flow Calculator",
    "description": "Laminar/Turbulent Flow Calculator – Flow Regime Calculator",
    "href": "/calculators/laminar-turbulent-flow-calculator"
  },
  {
    "name": "Manning Equation Calculator",
    "description": "Manning Equation Calculator – Open Channel Flow",
    "href": "/calculators/manning-equation-calculator"
  },
  {
    "name": "Water Flow Rate Calculator",
    "description": "Water Flow Rate Calculator – Calculate Flow Rate in Pipes",
    "href": "/calculators/water-flow-rate-calculator"
  },
  {
    "name": "Pipe Water Tank Pressure Calculator",
    "description": "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height",
    "href": "/calculators/pipe-water-tank-pressure-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pipe Friction Loss Calculator – Head Loss in Pipe Flow</h1>
        <p className="text-muted-foreground">Calculate pressure or head loss due to friction in pipes. Our pipe friction loss calculator uses the Darcy-Weisbach equation for accurate results in water and fluid systems.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
