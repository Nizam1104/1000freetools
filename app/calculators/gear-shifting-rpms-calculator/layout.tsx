import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Gear Shifting RPMs Calculator – Find the Perfect RPM to Shift Gears",
  description: "Optimize your driving performance with our Gear Shifting RPMs Calculator.            Enter your vehicle&apos;s gear ratios, tire size, and redline to find the            ideal RPM for each gear change and improve fuel efficiency or performance.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gear-shifting-rpms-calculator",
  },
};

const tools = [
  {
    "name": "Gear Ratio Calculator",
    "description": "Gear Ratio Calculator – Calculate Gear Train Ratio",
    "href": "/calculators/gear-ratio-calculator"
  },
  {
    "name": "Gear Train Efficiency Calculator",
    "description": "Gear Train Efficiency Calculator – Calculate Power Loss",
    "href": "/calculators/gear-train-efficiency-calculator"
  },
  {
    "name": "Rpm Calculator",
    "description": "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
    "href": "/calculators/rpm-calculator"
  },
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/calculators/torque-calculator"
  },
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/calculators/belt-tension-calculator"
  },
  {
    "name": "Robot Motor Torque Calculator",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
    "href": "/calculators/robot-motor-torque-calculator"
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
