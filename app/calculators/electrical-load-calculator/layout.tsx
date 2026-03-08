import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Electrical Load Calculator – Calculate Circuit Load",
  description: "Calculate the total electrical load on a circuit. Enter voltage and connected loads to determine current, breaker size, and wire requirements.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/electrical-load-calculator",
  },
};

const tools = [
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/calculators/electric-power-calculator"
  },
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
    "name": "Current Calculator",
    "description": "Current Calculator – Calculate Electrical Current (Amps)",
    "href": "/calculators/current-calculator"
  },
  {
    "name": "Voltage Calculator",
    "description": "Voltage Calculator",
    "href": "/calculators/voltage-calculator"
  },
  {
    "name": "Room Heater Wattage Calculator",
    "description": "Room Heater Wattage Calculator – Find the Right Heater Size for Your Room",
    "href": "/calculators/room-heater-wattage-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Electrical Load Calculator – Calculate Circuit Load</h1>
        <p className="text-muted-foreground">Calculate the total electrical load on a circuit. Enter voltage and connected loads to determine current, breaker size, and wire requirements.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
