import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "HVAC Airflow Calculator – Calculate Required CFM",
  description: "Calculate the required airflow for HVAC systems based on room volume and air changes per hour (ACH).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/hvac-airflow-calculator",
  },
};

const tools = [
  {
    "name": "Hvac Btu Calculator",
    "description": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
    "href": "/hvac-btu-calculator"
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
    "name": "Ventilation Rate Calculator",
    "description": "Ventilation Rate Calculator – Calculate Required Airflow (ACH & CFM) per ASHRAE",
    "href": "/ventilation-rate-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">HVAC Airflow Calculator – Calculate Required CFM</h1>
        <p className="text-muted-foreground">Calculate the required airflow for HVAC systems based on room volume and air changes per hour (ACH).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
