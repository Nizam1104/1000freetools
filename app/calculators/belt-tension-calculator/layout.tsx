import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Belt Tension Calculator – Calculate Belt Drive Tension",
  description: "Calculate belt tension and torque for belt drive systems. Determine proper initial tension for installation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/belt-tension-calculator",
  },
};

const tools = [
  {
    "name": "Belt Length Calculator",
    "description": "Belt Length Calculator – Calculate V-Belt Length",
    "href": "/belt-length-calculator"
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
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/safety-factor-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Belt Tension Calculator – Calculate Belt Drive Tension</h1>
        <p className="text-muted-foreground">Calculate belt tension and torque for belt drive systems. Determine proper initial tension for installation.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
