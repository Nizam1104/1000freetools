import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Gravitational Force Calculator – Newton's Law of Gravitation",
  description: "Calculate the gravitational force between two objects using Newton's universal law of gravitation. Enter mass and distance values to compute gravitational attraction.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gravitational-force-calculator",
  },
};

const tools = [
  {
    "name": "Gravitational Field Calculator",
    "description": "Gravitational Field Calculator – Calculate Gravitational Field Strength",
    "href": "/gravitational-field-calculator"
  },
  {
    "name": "Escape Velocity Calculator",
    "description": "Escape Velocity Calculator – Calculate Escape Velocity",
    "href": "/escape-velocity-calculator"
  },
  {
    "name": "Orbital Period Calculator",
    "description": "Orbital Period Calculator – Calculate Orbital Period",
    "href": "/orbital-period-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/momentum-calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/kinetic-energy-calculator"
  },
  {
    "name": "Velocity Calculator",
    "description": "Velocity Calculator – Calculate Speed with Direction",
    "href": "/velocity-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Gravitational Force Calculator – Newton's Law of Gravitation</h1>
        <p className="text-muted-foreground">Calculate the gravitational force between two objects using Newton's universal law of gravitation. Enter mass and distance values to compute gravitational attraction.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
