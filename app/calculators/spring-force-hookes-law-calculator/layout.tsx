import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Hooke's Law Calculator – Spring Force and Displacement",
  description: "Solve spring mechanics problems with our Hooke's Law calculator. Find force, spring constant, or displacement using F = kx for physics and mechanical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/spring-force-hookes-law-calculator",
  },
};

const tools = [
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
    "name": "Potential Energy Calculator",
    "description": "Potential Energy Calculator",
    "href": "/potential-energy-calculator"
  },
  {
    "name": "Work Calculator",
    "description": "Work Calculator",
    "href": "/work-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/momentum-calculator"
  },
  {
    "name": "Beam Bending Calculator",
    "description": "Beam Bending Calculator – Stress & Deflection for Structural Beams",
    "href": "/beam-bending-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Hooke's Law Calculator – Spring Force and Displacement</h1>
        <p className="text-muted-foreground">Solve spring mechanics problems with our Hooke's Law calculator. Find force, spring constant, or displacement using F = kx for physics and mechanical engineering.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
