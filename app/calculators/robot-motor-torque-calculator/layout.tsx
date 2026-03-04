import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
  description: "Select the right motor for your robot with our Torque Calculator.            Input the load weight, moment arm, speed requirements, and friction            coefficients to calculate minimum required torque — essential for            robotics engineers and makers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/robot-motor-torque-calculator",
  },
};

const tools = [
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
    "name": "Bolt Torque Calculator",
    "description": "Bolt Torque Calculator – Calculate Bolt Tightening Torque",
    "href": "/bolt-torque-calculator"
  },
  {
    "name": "Gear Ratio Calculator",
    "description": "Gear Ratio Calculator – Calculate Gear Train Ratio",
    "href": "/gear-ratio-calculator"
  },
  {
    "name": "Pump Horsepower Calculator",
    "description": "Pump Horsepower Calculator – Calculate Required Pump Power",
    "href": "/pump-horsepower-calculator"
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
