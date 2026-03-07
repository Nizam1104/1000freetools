import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Energy Calculator",
  description: "Calculate kinetic energy (KE = ½mv²) and gravitational potential energy (PE = mgh).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/energy-calculator",
  },
};

const tools = [
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/calculators/kinetic-energy-calculator"
  },
  {
    "name": "Potential Energy Calculator",
    "description": "Potential Energy Calculator",
    "href": "/calculators/potential-energy-calculator"
  },
  {
    "name": "Work Calculator",
    "description": "Work Calculator",
    "href": "/calculators/work-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/calculators/momentum-calculator"
  },
  {
    "name": "Spring Force Hookes Law Calculator",
    "description": "Hooke's Law Calculator – Spring Force and Displacement",
    "href": "/calculators/spring-force-hookes-law-calculator"
  },
  {
    "name": "Photon Energy Calculator",
    "description": "Photon Energy Calculator – Calculate Energy of a Photon",
    "href": "/calculators/photon-energy-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Energy Calculator</h1>
        <p className="text-muted-foreground">Calculate kinetic energy (KE = ½mv²) and gravitational potential energy (PE = mgh).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
