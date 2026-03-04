import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Kinetic Energy Calculator – Calculate Energy of Motion",
  description: "Calculate kinetic energy from mass and velocity. Includes classical and relativistic calculations for high-speed objects. Perfect for physics students and engineers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/kinetic-energy-calculator",
  },
};

const tools = [
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/momentum-calculator"
  },
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/energy-calculator"
  },
  {
    "name": "Potential Energy Calculator",
    "description": "Potential Energy Calculator",
    "href": "/potential-energy-calculator"
  },
  {
    "name": "Spring Force Hookes Law Calculator",
    "description": "Hooke's Law Calculator – Spring Force and Displacement",
    "href": "/spring-force-hookes-law-calculator"
  },
  {
    "name": "Acceleration Calculator",
    "description": "Acceleration Calculator",
    "href": "/acceleration-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Kinetic Energy Calculator – Calculate Energy of Motion</h1>
        <p className="text-muted-foreground">Calculate kinetic energy from mass and velocity. Includes classical and relativistic calculations for high-speed objects. Perfect for physics students and engineers.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
