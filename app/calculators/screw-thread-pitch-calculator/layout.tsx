import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Screw Thread Pitch Calculator – Thread Dimensions Calculator",
  description: "Calculate thread dimensions including pitch diameter and minor diameter for metric and imperial threads.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/screw-thread-pitch-calculator",
  },
};

const tools = [
  {
    "name": "Belt Length Calculator",
    "description": "Belt Length Calculator – Calculate V-Belt Length",
    "href": "/calculators/belt-length-calculator"
  },
  {
    "name": "Rivet Strength Calculator",
    "description": "Rivet Strength Calculator – Calculate Rivet Shear Capacity",
    "href": "/calculators/rivet-strength-calculator"
  },
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/calculators/safety-factor-calculator"
  },
  {
    "name": "Fastener Load Calculator",
    "description": "Fastener Load Calculator – Calculate Fastener Capacity",
    "href": "/calculators/fastener-load-calculator"
  },
  {
    "name": "Beam Bending Calculator",
    "description": "Beam Bending Calculator – Stress & Deflection for Structural Beams",
    "href": "/calculators/beam-bending-calculator"
  },
  {
    "name": "Bolt Torque Calculator",
    "description": "Bolt Torque Calculator – Calculate Bolt Tightening Torque",
    "href": "/calculators/bolt-torque-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Screw Thread Pitch Calculator – Thread Dimensions Calculator</h1>
        <p className="text-muted-foreground">Calculate thread dimensions including pitch diameter and minor diameter for metric and imperial threads.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
