import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Solar Irradiance Calculator – Estimate Solar Energy at Your Location",
  description: "Plan solar energy systems with confidence using our Solar Irradiance Calculator. Estimate the amount of solar energy (W/m²) available at your location based on latitude, season, and weather conditions — perfect for solar panel sizing and energy yield calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/solar-irradiance-calculator",
  },
};

const tools = [
  {
    "name": "Solar Panel Requirement Calculator",
    "description": "Solar Panel Requirement Calculator – Size Your Solar System",
    "href": "/calculators/solar-panel-requirement-calculator"
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
    "name": "Energy Consumption Breakdown Calculator",
    "description": "Energy Consumption Breakdown Calculator – See Where Your Energy Is Being Used",
    "href": "/calculators/energy-consumption-breakdown-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
  },
  {
    "name": "Electricity Appliance Wattage Calculator",
    "description": "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill",
    "href": "/calculators/electricity-appliance-wattage-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/solar-irradiance-calculator">Solar Irradiance Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
