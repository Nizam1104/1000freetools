import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Heat Transfer Calculator – Conduction, Convection & Radiation",
  description: "Analyze thermal performance with our heat transfer calculator. Compute heat flow rates for conduction, convection, and radiation in HVAC, manufacturing, and engineering design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/heat-transfer-calculator",
  },
};

const tools = [
  {
    "name": "Heat Pump Cop Calculator",
    "description": "Heat Pump COP Calculator – Coefficient of Performance",
    "href": "/heat-pump-cop-calculator"
  },
  {
    "name": "Boiler Efficiency Calculator",
    "description": "Boiler Efficiency Calculator – Calculate Boiler Efficiency",
    "href": "/boiler-efficiency-calculator"
  },
  {
    "name": "Thermal Expansion Calculator",
    "description": "Thermal Expansion Calculator – Linear and Volumetric Expansion",
    "href": "/thermal-expansion-calculator"
  },
  {
    "name": "Ideal Gas Law Calculator",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
    "href": "/ideal-gas-law-calculator"
  },
  {
    "name": "Air Conditioner Tonnage Calculator",
    "description": "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room",
    "href": "/air-conditioner-tonnage-calculator"
  },
  {
    "name": "Hvac Btu Calculator",
    "description": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
    "href": "/hvac-btu-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Heat Transfer Calculator – Conduction, Convection & Radiation</h1>
        <p className="text-muted-foreground">Analyze thermal performance with our heat transfer calculator. Compute heat flow rates for conduction, convection, and radiation in HVAC, manufacturing, and engineering design.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
