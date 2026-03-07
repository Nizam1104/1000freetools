import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rivet Strength Calculator – Calculate Rivet Shear Capacity",
  description: "Calculate the shear and bearing capacity of riveted joints. Essential for structural steel design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rivet-strength-calculator",
  },
};

const tools = [
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
    "name": "Screw Thread Pitch Calculator",
    "description": "Screw Thread Pitch Calculator – Thread Dimensions Calculator",
    "href": "/calculators/screw-thread-pitch-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Rivet Strength Calculator – Calculate Rivet Shear Capacity</h1>
        <p className="text-muted-foreground">Calculate the shear and bearing capacity of riveted joints. Essential for structural steel design.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
