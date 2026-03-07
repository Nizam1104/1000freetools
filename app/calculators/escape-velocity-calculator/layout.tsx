import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Escape Velocity Calculator – Calculate Escape Velocity",
  description: "Calculate the escape velocity needed to break free from a celestial body's gravitational pull. Our calculator uses the formula ve = √(2GM/R).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/escape-velocity-calculator",
  },
};

const tools = [
  {
    "name": "Gravitational Field Calculator",
    "description": "Gravitational Field Calculator – Calculate Gravitational Field Strength",
    "href": "/calculators/gravitational-field-calculator"
  },
  {
    "name": "Orbital Period Calculator",
    "description": "Orbital Period Calculator – Calculate Orbital Period",
    "href": "/calculators/orbital-period-calculator"
  },
  {
    "name": "Gravitational Force Calculator",
    "description": "Gravitational Force Calculator – Newton's Law of Gravitation",
    "href": "/calculators/gravitational-force-calculator"
  },
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Escape Velocity Calculator – Calculate Escape Velocity</h1>
        <p className="text-muted-foreground">Calculate the escape velocity needed to break free from a celestial body's gravitational pull. Our calculator uses the formula ve = √(2GM/R).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
