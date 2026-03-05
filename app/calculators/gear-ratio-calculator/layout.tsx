import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Gear Ratio Calculator – Calculate Gear Train Ratio",
  description: "Calculate gear ratios for single or multi-stage gear trains. Our calculator determines output speed and torque based on gear tooth counts.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gear-ratio-calculator",
  },
};

const tools = [
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
    "name": "Rpm Calculator",
    "description": "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
    "href": "/rpm-calculator"
  },
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/belt-tension-calculator"
  },
  {
    "name": "Belt Length Calculator",
    "description": "Belt Length Calculator – Calculate V-Belt Length",
    "href": "/belt-length-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Gear Ratio Calculator – Calculate Gear Train Ratio</h1>
        <p className="text-muted-foreground">Calculate gear ratios for single or multi-stage gear trains. Our calculator determines output speed and torque based on gear tooth counts.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
