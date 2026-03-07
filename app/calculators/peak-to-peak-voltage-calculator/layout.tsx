import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements",
  description: "Convert between peak, RMS, average, and peak-to-peak voltage for sine waves.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/peak-to-peak-voltage-calculator",
  },
};

const tools = [
  {
    "name": "Rms Value Calculator",
    "description": "RMS Value Calculator – Calculate Root Mean Square Voltage",
    "href": "/calculators/rms-value-calculator"
  },
  {
    "name": "Voltage Calculator",
    "description": "Voltage Calculator",
    "href": "/calculators/voltage-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/calculators/electric-power-calculator"
  },
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/calculators/ac-impedance-calculator"
  },
  {
    "name": "Current Calculator",
    "description": "Current Calculator – Calculate Electrical Current (Amps)",
    "href": "/calculators/current-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements</h1>
        <p className="text-muted-foreground">Convert between peak, RMS, average, and peak-to-peak voltage for sine waves.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
