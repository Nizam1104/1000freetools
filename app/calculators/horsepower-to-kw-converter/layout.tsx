import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Horsepower to kW Converter – Instantly Convert HP to Kilowatts",
  description: "Convert engine power between horsepower and kilowatts instantly with our free HP to kW            Converter. Whether you're comparing cars or working with technical specs, get accurate            conversions in seconds.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/horsepower-to-kw-converter",
  },
};

const tools = [
  {
    "name": "Pump Horsepower Calculator",
    "description": "Pump Horsepower Calculator – Calculate Required Pump Power",
    "href": "/calculators/pump-horsepower-calculator"
  },
  {
    "name": "Torque To Power Converter",
    "description": "Torque to Power Converter – Convert Engine Torque & RPM to HP or kW",
    "href": "/calculators/torque-to-power-converter"
  },
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/calculators/torque-calculator"
  },
  {
    "name": "Robot Motor Torque Calculator",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
    "href": "/calculators/robot-motor-torque-calculator"
  },
  {
    "name": "Shaft Torque Calculator",
    "description": "Shaft Torque Calculator – Calculate Shaft Torque",
    "href": "/calculators/shaft-torque-calculator"
  },
  {
    "name": "Rpm Calculator",
    "description": "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
    "href": "/calculators/rpm-calculator"
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
