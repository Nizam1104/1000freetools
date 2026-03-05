import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
  description: "Apply the ideal gas law PV = nRT to find any unknown gas property. Our calculator solves for pressure, volume, temperature, or amount of gas in chemistry and physics.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ideal-gas-law-calculator",
  },
};

const tools = [
  {
    "name": "Air Density Calculator",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
    "href": "/air-density-calculator"
  },
  {
    "name": "Humidity Calculator",
    "description": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
    "href": "/humidity-calculator"
  },
  {
    "name": "Vapor Pressure Calculator",
    "description": "Vapor Pressure Calculator – Calculate Vapor Pressure at Any Temperature",
    "href": "/vapor-pressure-calculator"
  },
  {
    "name": "Heat Transfer Calculator",
    "description": "Heat Transfer Calculator – Conduction, Convection & Radiation",
    "href": "/heat-transfer-calculator"
  },
  {
    "name": "Thermal Expansion Calculator",
    "description": "Thermal Expansion Calculator – Linear and Volumetric Expansion",
    "href": "/thermal-expansion-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Ideal Gas Law Calculator – Solve PV = nRT for Any Variable</h1>
        <p className="text-muted-foreground">Apply the ideal gas law PV = nRT to find any unknown gas property. Our calculator solves for pressure, volume, temperature, or amount of gas in chemistry and physics.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
