import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Momentum Calculator",
  description: "Calculate linear momentum from mass and velocity (p = mv), or from force and time (p = F × t).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/momentum-calculator",
  },
};

const tools = [
  {
    "name": "Acceleration Calculator",
    "description": "Acceleration Calculator",
    "href": "/calculators/acceleration-calculator"
  },
  {
    "name": "Velocity Calculator",
    "description": "Velocity Calculator – Calculate Speed with Direction",
    "href": "/calculators/velocity-calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/calculators/kinetic-energy-calculator"
  },
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/calculators/energy-calculator"
  },
  {
    "name": "Potential Energy Calculator",
    "description": "Potential Energy Calculator",
    "href": "/calculators/potential-energy-calculator"
  },
  {
    "name": "Spring Force Hookes Law Calculator",
    "description": "Hooke's Law Calculator – Spring Force and Displacement",
    "href": "/calculators/spring-force-hookes-law-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Momentum Calculator</h1>
        <p className="text-muted-foreground">Calculate linear momentum from mass and velocity (p = mv), or from force and time (p = F × t).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
