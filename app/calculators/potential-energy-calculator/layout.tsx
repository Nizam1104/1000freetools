import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Potential Energy Calculator",
  description: "Calculate gravitational potential energy (PE = mgh) or elastic potential energy (PE = ½kx²).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/potential-energy-calculator",
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
    "name": "Spring Force Hookes Law Calculator",
    "description": "Hooke's Law Calculator – Spring Force and Displacement",
    "href": "/spring-force-hookes-law-calculator"
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
    "name": "Gravitational Field Calculator",
    "description": "Gravitational Field Calculator – Calculate Gravitational Field Strength",
    "href": "/gravitational-field-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Potential Energy Calculator</h1>
        <p className="text-muted-foreground">Calculate gravitational potential energy (PE = mgh) or elastic potential energy (PE = ½kx²).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
