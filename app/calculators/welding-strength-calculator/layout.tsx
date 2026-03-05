import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Welding Strength Calculator – Calculate Weld Strength",
  description: "Calculate the strength of welds based on weld type, size, and electrode strength. Essential for structural design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/welding-strength-calculator",
  },
};

const tools = [
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/safety-factor-calculator"
  },
  {
    "name": "Stress Strain Calculator",
    "description": "Stress/Strain Calculator – Mechanical Properties Calculator",
    "href": "/stress-strain-calculator"
  },
  {
    "name": "Beam Bending Calculator",
    "description": "Beam Bending Calculator – Stress & Deflection for Structural Beams",
    "href": "/beam-bending-calculator"
  },
  {
    "name": "Fastener Load Calculator",
    "description": "Fastener Load Calculator – Calculate Fastener Capacity",
    "href": "/fastener-load-calculator"
  },
  {
    "name": "Rivet Strength Calculator",
    "description": "Rivet Strength Calculator – Calculate Rivet Shear Capacity",
    "href": "/rivet-strength-calculator"
  },
  {
    "name": "Bolt Torque Calculator",
    "description": "Bolt Torque Calculator – Calculate Bolt Tightening Torque",
    "href": "/bolt-torque-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Welding Strength Calculator – Calculate Weld Strength</h1>
        <p className="text-muted-foreground">Calculate the strength of welds based on weld type, size, and electrode strength. Essential for structural design.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
