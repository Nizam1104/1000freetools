import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used",
  description: "Identify your biggest energy users with our Energy Consumption Breakdown Calculator.            Enter usage data for appliances, heating, cooling, and lighting to see a detailed            percentage breakdown of total energy consumption — helping you prioritize efficiency improvements.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/energy-consumption-breakdown-calculator",
  },
};

const tools = [
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
  },
  {
    "name": "Electricity Appliance Wattage Calculator",
    "description": "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill",
    "href": "/calculators/electricity-appliance-wattage-calculator"
  },
  {
    "name": "Co Emissions Calculator",
    "description": "CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity",
    "href": "/calculators/co-emissions-calculator"
  },
  {
    "name": "Carbon Footprint Calculator",
    "description": "Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint",
    "href": "/calculators/carbon-footprint-calculator"
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
