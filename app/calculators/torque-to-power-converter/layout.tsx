import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Torque to Power Converter – Convert Engine Torque & RPM to HP or kW",
  description: "Calculate your engine's power output from torque and RPM with our Torque-to-Power            Converter. Enter torque in Nm or lb-ft along with RPM to get horsepower or kilowatts            instantly — perfect for automotive enthusiasts and engineers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/torque-to-power-converter",
  },
};

const tools = [
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/torque-calculator"
  },
  {
    "name": "Horsepower To Kw Converter",
    "description": "Horsepower to kW Converter – Instantly Convert HP to Kilowatts",
    "href": "/horsepower-to-kw-converter"
  },
  {
    "name": "Pump Horsepower Calculator",
    "description": "Pump Horsepower Calculator – Calculate Required Pump Power",
    "href": "/pump-horsepower-calculator"
  },
  {
    "name": "Robot Motor Torque Calculator",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
    "href": "/robot-motor-torque-calculator"
  },
  {
    "name": "Shaft Torque Calculator",
    "description": "Shaft Torque Calculator – Calculate Shaft Torque",
    "href": "/shaft-torque-calculator"
  },
  {
    "name": "Rpm Calculator",
    "description": "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
    "href": "/rpm-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
