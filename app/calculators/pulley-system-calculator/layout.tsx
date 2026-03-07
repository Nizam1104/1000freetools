import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pulley System Calculator – Block and Tackle Calculator",
  description: "Calculate mechanical advantage and required effort for pulley systems. Determine rope length needed for lifting.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pulley-system-calculator",
  },
};

const tools = [
  {
    "name": "Belt Length Calculator",
    "description": "Belt Length Calculator – Calculate V-Belt Length",
    "href": "/calculators/belt-length-calculator"
  },
  {
    "name": "Belt Tension Calculator",
    "description": "Belt Tension Calculator – Calculate Belt Drive Tension",
    "href": "/calculators/belt-tension-calculator"
  },
  {
    "name": "Gear Ratio Calculator",
    "description": "Gear Ratio Calculator – Calculate Gear Train Ratio",
    "href": "/calculators/gear-ratio-calculator"
  },
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
    "name": "Fastener Load Calculator",
    "description": "Fastener Load Calculator – Calculate Fastener Capacity",
    "href": "/calculators/fastener-load-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pulley System Calculator – Block and Tackle Calculator</h1>
        <p className="text-muted-foreground">Calculate mechanical advantage and required effort for pulley systems. Determine rope length needed for lifting.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
