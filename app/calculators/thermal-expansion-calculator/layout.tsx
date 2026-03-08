import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Thermal Expansion Calculator – Linear and Volumetric Expansion",
  description: "Calculate how much a material expands or contracts with temperature change. Our thermal expansion calculator covers linear and volumetric expansion for engineering design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/thermal-expansion-calculator",
  },
};

const tools = [
  {
    "name": "Heat Transfer Calculator",
    "description": "Heat Transfer Calculator – Conduction, Convection & Radiation",
    "href": "/calculators/heat-transfer-calculator"
  },
  {
    "name": "Ideal Gas Law Calculator",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
    "href": "/calculators/ideal-gas-law-calculator"
  },
  {
    "name": "Air Density Calculator",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
    "href": "/calculators/air-density-calculator"
  },
  {
    "name": "Humidity Calculator",
    "description": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
    "href": "/calculators/humidity-calculator"
  },
  {
    "name": "Heat Index Calculator",
    "description": "Heat Index Calculator – Calculate the 'Feels Like' Temperature",
    "href": "/calculators/heat-index-calculator"
  },
  {
    "name": "Dew Point Calculator",
    "description": "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity",
    "href": "/calculators/dew-point-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Thermal Expansion Calculator – Linear and Volumetric Expansion</h1>
        <p className="text-muted-foreground">Calculate how much a material expands or contracts with temperature change. Our thermal expansion calculator covers linear and volumetric expansion for engineering design.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
