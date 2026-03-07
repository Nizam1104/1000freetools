import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "LED Resistor Calculator – Calculate Current Limiting Resistor",
  description: "Calculate the correct resistor value for your LED circuit. Enter supply voltage, LED forward voltage and current to get the required resistance and power rating.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/led-resistor-calculator",
  },
};

const tools = [
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Resistance Calculator",
    "description": "Resistance Calculator – Calculate Resistance with Ohm's Law",
    "href": "/calculators/resistance-calculator"
  },
  {
    "name": "Series Parallel Resistor Calculator",
    "description": "Resistor Calculator – Series and Parallel Resistance Calculator",
    "href": "/calculators/series-parallel-resistor-calculator"
  },
  {
    "name": "Series Parallel Capacitor Calculator",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
    "href": "/calculators/series-parallel-capacitor-calculator"
  },
  {
    "name": "Inductor Calculations",
    "description": "Inductor Calculator – Inductance and Inductive Reactance Calculator",
    "href": "/calculators/inductor-calculations"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/calculators/rc-time-constant-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">LED Resistor Calculator – Calculate Current Limiting Resistor</h1>
        <p className="text-muted-foreground">Calculate the correct resistor value for your LED circuit. Enter supply voltage, LED forward voltage and current to get the required resistance and power rating.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
