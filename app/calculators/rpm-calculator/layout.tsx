import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
  description: "Calculate RPM for pulley systems, gear trains, and AC motors instantly. Enter your parameters to find output speed, gear ratio, and motor synchronous speed — free online RPM calculator for engineers and mechanics.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rpm-calculator",
  },
};

const tools = [
  {
    "name": "Gear Ratio Calculator",
    "description": "Gear Ratio Calculator – Calculate Gear Train Ratio",
    "href": "/gear-ratio-calculator"
  },
  {
    "name": "Gear Shifting Rpms Calculator",
    "description": "Gear Shifting RPMs Calculator – Find the Perfect RPM to Shift Gears",
    "href": "/gear-shifting-rpms-calculator"
  },
  {
    "name": "Gear Train Efficiency Calculator",
    "description": "Gear Train Efficiency Calculator – Calculate Power Loss",
    "href": "/gear-train-efficiency-calculator"
  },
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/torque-calculator"
  },
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/belt-tension-calculator"
  },
  {
    "name": "Robot Motor Torque Calculator",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
    "href": "/robot-motor-torque-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">RPM Calculator – Calculate Rotational Speed and Gear Ratios</h1>
        <p className="text-muted-foreground">Calculate RPM for pulley systems, gear trains, and AC motors instantly. Enter your parameters to find output speed, gear ratio, and motor synchronous speed — free online RPM calculator for engineers and mechanics.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
