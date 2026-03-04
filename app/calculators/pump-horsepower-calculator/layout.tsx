import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pump Horsepower Calculator – Calculate Required Pump Power",
  description: "Size your pump correctly with our pump horsepower calculator. Enter flow rate, total head, and efficiency to find the required pump power in HP or kW.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pump-horsepower-calculator",
  },
};

const tools = [
  {
    "name": "Horsepower To Kw Converter",
    "description": "Horsepower to kW Converter – Instantly Convert HP to Kilowatts",
    "href": "/horsepower-to-kw-converter"
  },
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/torque-calculator"
  },
  {
    "name": "Shaft Torque Calculator",
    "description": "Shaft Torque Calculator – Calculate Shaft Torque",
    "href": "/shaft-torque-calculator"
  },
  {
    "name": "Robot Motor Torque Calculator",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
    "href": "/robot-motor-torque-calculator"
  },
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/electric-power-calculator"
  },
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/safety-factor-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pump Horsepower Calculator – Calculate Required Pump Power</h1>
        <p className="text-muted-foreground">Size your pump correctly with our pump horsepower calculator. Enter flow rate, total head, and efficiency to find the required pump power in HP or kW.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
