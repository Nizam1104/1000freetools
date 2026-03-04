import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Resistor Calculator – Series and Parallel Resistance Calculator",
  description: "Calculate total resistance for any series or parallel resistor network. Enter individual resistor values to get the equivalent resistance for circuit design and analysis.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/series-parallel-resistor-calculator",
  },
};

const tools = [
  {
    "name": "Series Parallel Capacitor Calculator",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
    "href": "/series-parallel-capacitor-calculator"
  },
  {
    "name": "Led Resistor Calculator",
    "description": "LED Resistor Calculator – Calculate Current Limiting Resistor",
    "href": "/led-resistor-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/ohms-law-calculator"
  },
  {
    "name": "Resistance Calculator",
    "description": "Resistance Calculator – Calculate Resistance with Ohm's Law",
    "href": "/resistance-calculator"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/rc-time-constant-calculator"
  },
  {
    "name": "Inductor Calculations",
    "description": "Inductor Calculator – Inductance and Inductive Reactance Calculator",
    "href": "/inductor-calculations"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Resistor Calculator – Series and Parallel Resistance Calculator</h1>
        <p className="text-muted-foreground">Calculate total resistance for any series or parallel resistor network. Enter individual resistor values to get the equivalent resistance for circuit design and analysis.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
