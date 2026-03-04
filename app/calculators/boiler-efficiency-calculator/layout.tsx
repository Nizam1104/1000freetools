import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Boiler Efficiency Calculator – Calculate Boiler Efficiency",
  description: "Calculate boiler efficiency from fuel input and heat output. Estimate stack losses from exhaust temperature.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/boiler-efficiency-calculator",
  },
};

const tools = [
  {
    "name": "Heat Pump Cop Calculator",
    "description": "Heat Pump COP Calculator – Coefficient of Performance",
    "href": "/heat-pump-cop-calculator"
  },
  {
    "name": "Hvac Btu Calculator",
    "description": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
    "href": "/hvac-btu-calculator"
  },
  {
    "name": "Hvac Airflow Calculator",
    "description": "HVAC Airflow Calculator – Calculate Required CFM",
    "href": "/hvac-airflow-calculator"
  },
  {
    "name": "Air Conditioner Tonnage Calculator",
    "description": "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room",
    "href": "/air-conditioner-tonnage-calculator"
  },
  {
    "name": "Chiller Tonnage Calculator",
    "description": "Chiller Tonnage Calculator – Calculate Cooling Capacity",
    "href": "/chiller-tonnage-calculator"
  },
  {
    "name": "Heat Transfer Calculator",
    "description": "Heat Transfer Calculator – Conduction, Convection & Radiation",
    "href": "/heat-transfer-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Boiler Efficiency Calculator – Calculate Boiler Efficiency</h1>
        <p className="text-muted-foreground">Calculate boiler efficiency from fuel input and heat output. Estimate stack losses from exhaust temperature.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
