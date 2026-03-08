import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room",
  description: "Choose the right air conditioner for your space with our AC Tonnage Calculator. Enter            your room size, ceiling height, insulation quality, and climate zone to get the            recommended BTU or tonnage — ensuring comfort and energy efficiency.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/air-conditioner-tonnage-calculator",
  },
};

const tools = [
  {
    "name": "Chiller Tonnage Calculator",
    "description": "Chiller Tonnage Calculator – Calculate Cooling Capacity",
    "href": "/calculators/chiller-tonnage-calculator"
  },
  {
    "name": "Hvac Airflow Calculator",
    "description": "HVAC Airflow Calculator – Calculate Required CFM",
    "href": "/calculators/hvac-airflow-calculator"
  },
  {
    "name": "Hvac Btu Calculator",
    "description": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
    "href": "/calculators/hvac-btu-calculator"
  },
  {
    "name": "Heat Pump Cop Calculator",
    "description": "Heat Pump COP Calculator – Coefficient of Performance",
    "href": "/calculators/heat-pump-cop-calculator"
  },
  {
    "name": "Room Heater Wattage Calculator",
    "description": "Room Heater Wattage Calculator – Find the Right Heater Size for Your Room",
    "href": "/calculators/room-heater-wattage-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
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
