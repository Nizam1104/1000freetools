import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Acceleration Calculator",
  description: "Calculate acceleration from change in velocity over time, or use Newton's second law (F = ma).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/acceleration-calculator",
  },
};

const tools = [
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "Velocity Calculator",
    "description": "Velocity Calculator – Calculate Speed with Direction",
    "href": "/calculators/velocity-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/calculators/momentum-calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/calculators/kinetic-energy-calculator"
  },
  {
    "name": "Escape Velocity Calculator",
    "description": "Escape Velocity Calculator – Calculate Escape Velocity",
    "href": "/calculators/escape-velocity-calculator"
  },
  {
    "name": "Potential Energy Calculator",
    "description": "Potential Energy Calculator",
    "href": "/calculators/potential-energy-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Acceleration Calculator</h1>
        <p className="text-muted-foreground">Calculate acceleration from change in velocity over time, or use Newton's second law (F = ma).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
