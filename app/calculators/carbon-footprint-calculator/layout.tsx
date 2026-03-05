import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator – Calculate Your Personal Annual CO₂ Footprint",
  description: "Understand your environmental impact with our Carbon Footprint Calculator. Answer questions about your travel habits, home energy use, diet, and purchases to calculate your total annual CO₂ footprint in tonnes — and discover the biggest areas for reduction.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/carbon-footprint-calculator",
  },
};

const tools = [
  {
    "name": "Co Emissions Calculator",
    "description": "CO₂ Emissions Calculator – Calculate Carbon Dioxide Emissions from Any Activity",
    "href": "/co-emissions-calculator"
  },
  {
    "name": "Energy Consumption Breakdown Calculator",
    "description": "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used",
    "href": "/energy-consumption-breakdown-calculator"
  },
  {
    "name": "Solar Irradiance Calculator",
    "description": "Solar Irradiance Calculator – Estimate Solar Energy at Your Location",
    "href": "/solar-irradiance-calculator"
  },
  {
    "name": "Solar Panel Requirement Calculator",
    "description": "Solar Panel Requirement Calculator – Size Your Solar System",
    "href": "/solar-panel-requirement-calculator"
  },
  {
    "name": "Electricity Appliance Wattage Calculator",
    "description": "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill",
    "href": "/electricity-appliance-wattage-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/electrical-load-calculator"
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
