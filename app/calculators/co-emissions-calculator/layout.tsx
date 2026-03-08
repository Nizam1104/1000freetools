import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity",
  description: "Quantify your carbon impact with our CO₂ Emissions Calculator. Enter data for            transportation, electricity use, or other activities to calculate total CO₂            emissions — supporting sustainability reporting and carbon reduction planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/co-emissions-calculator",
  },
};

const tools = [
  {
    "name": "Carbon Footprint Calculator",
    "description": "Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint",
    "href": "/calculators/carbon-footprint-calculator"
  },
  {
    "name": "Energy Consumption Breakdown Calculator",
    "description": "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used",
    "href": "/calculators/energy-consumption-breakdown-calculator"
  },
  {
    "name": "Solar Irradiance Calculator",
    "description": "Solar Irradiance Calculator – Estimate Solar Energy at Your Location",
    "href": "/calculators/solar-irradiance-calculator"
  },
  {
    "name": "Solar Panel Requirement Calculator",
    "description": "Solar Panel Requirement Calculator – Size Your Solar System",
    "href": "/calculators/solar-panel-requirement-calculator"
  },
  {
    "name": "Electricity Appliance Wattage Calculator",
    "description": "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill",
    "href": "/calculators/electricity-appliance-wattage-calculator"
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
