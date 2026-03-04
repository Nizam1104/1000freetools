import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Belt Length Calculator – Calculate V-Belt Length",
  description: "Calculate the required belt length for a two-pulley system. Enter pulley diameters and center distance to find the correct belt size.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/belt-length-calculator",
  },
};

const tools = [
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/belt-tension-calculator"
  },
  {
    "name": "Gear Ratio Calculator",
    "description": "Gear Ratio Calculator – Calculate Gear Train Ratio",
    "href": "/gear-ratio-calculator"
  },
  {
    "name": "Rpm Calculator",
    "description": "RPM Calculator – Calculate Rotational Speed and Gear Ratios",
    "href": "/rpm-calculator"
  },
  {
    "name": "Torque Calculator",
    "description": "Torque Calculator",
    "href": "/torque-calculator"
  },
  {
    "name": "Pulley System Calculator",
    "description": "Pulley System Calculator – Block and Tackle Calculator",
    "href": "/pulley-system-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Belt Length Calculator – Calculate V-Belt Length</h1>
        <p className="text-muted-foreground">Calculate the required belt length for a two-pulley system. Enter pulley diameters and center distance to find the correct belt size.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
