import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Inductor Calculator – Inductance and Inductive Reactance Calculator",
  description: "Analyze inductor behavior in circuits with our inductor calculator. Compute inductance, inductive reactance (XL), and impedance for AC circuit design and electronics.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/inductor-calculations",
  },
};

const tools = [
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/ac-impedance-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/ohms-law-calculator"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/rc-time-constant-calculator"
  },
  {
    "name": "Rl Time Constant Calculator",
    "description": "RL Time Constant Calculator – Calculate RL Circuit Time Constant",
    "href": "/rl-time-constant-calculator"
  },
  {
    "name": "Rlc Resonance Calculator",
    "description": "RLC Resonance Calculator – Calculate Resonant Frequency",
    "href": "/rlc-resonance-calculator"
  },
  {
    "name": "Series Parallel Capacitor Calculator",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
    "href": "/series-parallel-capacitor-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Inductor Calculator – Inductance and Inductive Reactance Calculator</h1>
        <p className="text-muted-foreground">Analyze inductor behavior in circuits with our inductor calculator. Compute inductance, inductive reactance (XL), and impedance for AC circuit design and electronics.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
