import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Stress/Strain Calculator – Mechanical Properties Calculator",
  description: "Calculate stress, strain, and Young's modulus for materials. Our calculator helps analyze mechanical properties for engineering and physics applications.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/stress-strain-calculator",
  },
};

const tools = [
  {
    "name": "Beam Bending Calculator",
    "description": "Beam Bending Calculator – Stress & Deflection for Structural Beams",
    "href": "/beam-bending-calculator"
  },
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/safety-factor-calculator"
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
  },
  {
    "name": "Spring Force Hookes Law Calculator",
    "description": "Hooke's Law Calculator – Spring Force and Displacement",
    "href": "/spring-force-hookes-law-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Stress/Strain Calculator – Mechanical Properties Calculator</h1>
        <p className="text-muted-foreground">Calculate stress, strain, and Young's modulus for materials. Our calculator helps analyze mechanical properties for engineering and physics applications.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
