import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Capacitor Calculator – Series and Parallel Capacitance Calculator",
  description: "Find the equivalent capacitance for series or parallel capacitor circuits. Our calculator handles any number of capacitors and displays results in µF, nF, or pF.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/series-parallel-capacitor-calculator",
  },
};

const tools = [
  {
    "name": "Series Parallel Resistor Calculator",
    "description": "Resistor Calculator – Series and Parallel Resistance Calculator",
    "href": "/calculators/series-parallel-resistor-calculator"
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
  },
  {
    "name": "Rl Time Constant Calculator",
    "description": "RL Time Constant Calculator – Calculate RL Circuit Time Constant",
    "href": "/calculators/rl-time-constant-calculator"
  },
  {
    "name": "Rlc Resonance Calculator",
    "description": "RLC Resonance Calculator – Calculate Resonant Frequency",
    "href": "/calculators/rlc-resonance-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Capacitor Calculator – Series and Parallel Capacitance Calculator</h1>
        <p className="text-muted-foreground">Find the equivalent capacitance for series or parallel capacitor circuits. Our calculator handles any number of capacitors and displays results in µF, nF, or pF.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
