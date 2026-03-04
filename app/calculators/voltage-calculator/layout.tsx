import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Voltage Calculator",
  description: "Calculate voltage using Ohm's Law (V = IR), from power and current (V = P/I), or from power and resistance (V = √(PR)).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/voltage-calculator",
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
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/electric-power-calculator"
  },
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/ac-impedance-calculator"
  },
  {
    "name": "Peak To Peak Voltage Calculator",
    "description": "Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements",
    "href": "/peak-to-peak-voltage-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Voltage Calculator</h1>
        <p className="text-muted-foreground">Calculate voltage using Ohm's Law (V = IR), from power and current (V = P/I), or from power and resistance (V = √(PR)).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
