import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Resistance Calculator – Calculate Resistance with Ohm's Law",
  description: "Find electrical resistance using voltage and current with our resistance calculator. Based on Ohm's Law R = V/I, suitable for circuit analysis and electronics design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/resistance-calculator",
  },
};

const tools = [
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Current Calculator",
    "description": "Current Calculator – Calculate Electrical Current (Amps)",
    "href": "/calculators/current-calculator"
  },
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/calculators/electric-power-calculator"
  },
  {
    "name": "Voltage Calculator",
    "description": "Voltage Calculator",
    "href": "/calculators/voltage-calculator"
  },
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/calculators/ac-impedance-calculator"
  },
  {
    "name": "Led Resistor Calculator",
    "description": "LED Resistor Calculator – Calculate Current Limiting Resistor",
    "href": "/calculators/led-resistor-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Resistance Calculator – Calculate Resistance with Ohm's Law</h1>
        <p className="text-muted-foreground">Find electrical resistance using voltage and current with our resistance calculator. Based on Ohm's Law R = V/I, suitable for circuit analysis and electronics design.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
