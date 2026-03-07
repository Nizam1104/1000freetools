import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Velocity Calculator – Calculate Speed with Direction",
  description: "Calculate velocity from displacement and time. Unlike speed, velocity includes direction – making it a vector quantity essential for physics and engineering calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/velocity-calculator",
  },
};

const tools = [
  {
    "name": "Acceleration Calculator",
    "description": "Acceleration Calculator",
    "href": "/calculators/acceleration-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
    "name": "Boat Speed Calculator",
    "description": "Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat",
    "href": "/calculators/boat-speed-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/calculators/pace-to-speed-converter"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Velocity Calculator – Calculate Speed with Direction</h1>
        <p className="text-muted-foreground">Calculate velocity from displacement and time. Unlike speed, velocity includes direction – making it a vector quantity essential for physics and engineering calculations.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
