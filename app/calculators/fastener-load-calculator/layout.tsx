import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Fastener Load Calculator – Calculate Fastener Capacity",
  description: "Calculate the load capacity of fasteners including tensile and shear strength with safety factors.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/fastener-load-calculator",
  },
};

const tools = [
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/calculators/safety-factor-calculator"
  },
  {
    "name": "Beam Bending Calculator",
    "description": "Beam Bending Calculator – Stress & Deflection for Structural Beams",
    "href": "/calculators/beam-bending-calculator"
  },
  {
    "name": "Stress Strain Calculator",
    "description": "Stress/Strain Calculator – Mechanical Properties Calculator",
    "href": "/calculators/stress-strain-calculator"
  },
  {
    "name": "Bolt Torque Calculator",
    "description": "Bolt Torque Calculator – Calculate Bolt Tightening Torque",
    "href": "/calculators/bolt-torque-calculator"
  },
  {
    "name": "Rivet Strength Calculator",
    "description": "Rivet Strength Calculator – Calculate Rivet Shear Capacity",
    "href": "/calculators/rivet-strength-calculator"
  },
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/calculators/belt-tension-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Fastener Load Calculator – Calculate Fastener Capacity</h1>
        <p className="text-muted-foreground">Calculate the load capacity of fasteners including tensile and shear strength with safety factors.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
