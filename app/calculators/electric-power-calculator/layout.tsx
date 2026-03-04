import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Electric Power Calculator",
  description: "Calculate electrical power using P = VI, P = I²R, or P = V²/R. Also calculate energy consumption over time.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/electric-power-calculator",
  },
};

const tools = [
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
    "name": "Current Calculator",
    "description": "Current Calculator – Calculate Electrical Current (Amps)",
    "href": "/current-calculator"
  },
  {
    "name": "Voltage Calculator",
    "description": "Voltage Calculator",
    "href": "/voltage-calculator"
  },
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/ac-impedance-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/electrical-load-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Electric Power Calculator</h1>
        <p className="text-muted-foreground">Calculate electrical power using P = VI, P = I²R, or P = V²/R. Also calculate energy consumption over time.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
