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
  title: "Solar Panel Requirement Calculator – Size Your Solar System",
  description: "Calculate how many solar panels you need for your energy requirements. Our calculator considers daily consumption, sun hours, and system losses to size your solar installation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/solar-panel-requirement-calculator",
  },
};

const tools = [
  {
    "name": "Solar Irradiance Calculator",
    "description": "Solar Irradiance Calculator – Estimate Solar Energy at Your Location",
    "href": "/calculators/solar-irradiance-calculator"
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
                    <BreadcrumbLink href="/calculators/solar-panel-requirement-calculator">Solar Panel Requirement Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Solar Panel Requirement Calculator – Size Your Solar System</h1>
        <p className="text-muted-foreground">Calculate how many solar panels you need for your energy requirements. Our calculator considers daily consumption, sun hours, and system losses to size your solar installation.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
