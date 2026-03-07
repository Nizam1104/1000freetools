import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Beam Bending Calculator – Stress & Deflection for Structural Beams",
  description: "Analyze beam performance under load with our beam bending calculator. Calculate maximum bending stress, deflection, and moment for simply supported and cantilever beams.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/beam-bending-calculator",
  },
};

const tools = [
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator – Factor of Safety Calculator",
    "href": "/calculators/safety-factor-calculator"
  },
  {
    "name": "Stress Strain Calculator",
    "description": "Stress/Strain Calculator – Mechanical Properties Calculator",
    "href": "/calculators/stress-strain-calculator"
  },
  {
    "name": "Fastener Load Calculator",
    "description": "Fastener Load Calculator – Calculate Fastener Capacity",
    "href": "/calculators/fastener-load-calculator"
  },
  {
    "name": "Bolt Torque Calculator",
    "description": "Bolt Torque Calculator – Calculate Bolt Tightening Torque",
    "href": "/calculators/bolt-torque-calculator"
  },
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/calculators/belt-tension-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Beam Bending Calculator – Stress & Deflection for Structural Beams</h1>
        <p className="text-muted-foreground">Analyze beam performance under load with our beam bending calculator. Calculate maximum bending stress, deflection, and moment for simply supported and cantilever beams.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
