import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
  description: "Calculate the density of air at any altitude, temperature, and pressure with our Air Density Calculator. Essential for aviation, HVAC engineering, meteorology, and aerodynamics calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/air-density-calculator",
  },
};

const tools = [
  {
    "name": "Humidity Calculator",
    "description": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
    "href": "/calculators/humidity-calculator"
  },
  {
    "name": "Dew Point Calculator",
    "description": "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity",
    "href": "/calculators/dew-point-calculator"
  },
  {
    "name": "Heat Index Calculator",
    "description": "Heat Index Calculator – Calculate the 'Feels Like' Temperature",
    "href": "/calculators/heat-index-calculator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/calculators/wind-chill-calculator"
  },
  {
    "name": "Ideal Gas Law Calculator",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
    "href": "/calculators/ideal-gas-law-calculator"
  },
  {
    "name": "Vapor Pressure Calculator",
    "description": "Vapor Pressure Calculator – Calculate Vapor Pressure at Any Temperature",
    "href": "/calculators/vapor-pressure-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
