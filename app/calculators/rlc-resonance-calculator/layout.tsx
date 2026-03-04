import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "RLC Resonance Calculator – Calculate Resonant Frequency",
  description: "Calculate resonant frequency, quality factor, and bandwidth for RLC circuits. Essential for filter and oscillator design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rlc-resonance-calculator",
  },
};

const tools = [
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
    "name": "Inductor Calculations",
    "description": "Inductor Calculator – Inductance and Inductive Reactance Calculator",
    "href": "/inductor-calculations"
  },
  {
    "name": "Series Parallel Capacitor Calculator",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
    "href": "/series-parallel-capacitor-calculator"
  },
  {
    "name": "Duty Cycle Calculator",
    "description": "Duty Cycle Calculator – Calculate PWM Duty Cycle",
    "href": "/duty-cycle-calculator"
  },
  {
    "name": "Pwm Frequency Calculator",
    "description": "PWM Frequency Calculator – Calculate PWM Output Frequency",
    "href": "/pwm-frequency-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">RLC Resonance Calculator – Calculate Resonant Frequency</h1>
        <p className="text-muted-foreground">Calculate resonant frequency, quality factor, and bandwidth for RLC circuits. Essential for filter and oscillator design.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
