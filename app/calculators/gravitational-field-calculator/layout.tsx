import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Gravitational Field Calculator – Calculate Gravitational Field Strength",
  description: "Calculate the gravitational field strength at a distance from a mass. Our calculator uses g = GM/r² for point masses and spherical bodies.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gravitational-field-calculator",
  },
};

const tools = [
  {
    "name": "Gravitational Force Calculator",
    "description": "Gravitational Force Calculator – Newton's Law of Gravitation",
    "href": "/gravitational-force-calculator"
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
    "name": "Acceleration Calculator",
    "description": "Acceleration Calculator",
    "href": "/acceleration-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/momentum-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Gravitational Field Calculator – Calculate Gravitational Field Strength</h1>
        <p className="text-muted-foreground">Calculate the gravitational field strength at a distance from a mass. Our calculator uses g = GM/r² for point masses and spherical bodies.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
