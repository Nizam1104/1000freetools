import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Relativistic Energy Calculator – Special Relativity Calculator",
  description: "Calculate relativistic energy, momentum, and mass using Einstein's special relativity. Our calculator handles high-velocity scenarios where classical physics breaks down.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/relativistic-energy-calculator",
  },
};

const tools = [
  {
    "name": "Photon Energy Calculator",
    "description": "Photon Energy Calculator – Calculate Energy of a Photon",
    "href": "/photon-energy-calculator"
  },
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/energy-calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/kinetic-energy-calculator"
  },
  {
    "name": "Escape Velocity Calculator",
    "description": "Escape Velocity Calculator – Calculate Escape Velocity",
    "href": "/escape-velocity-calculator"
  },
  {
    "name": "Gravitational Force Calculator",
    "description": "Gravitational Force Calculator – Newton's Law of Gravitation",
    "href": "/gravitational-force-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/momentum-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Relativistic Energy Calculator – Special Relativity Calculator</h1>
        <p className="text-muted-foreground">Calculate relativistic energy, momentum, and mass using Einstein's special relativity. Our calculator handles high-velocity scenarios where classical physics breaks down.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
