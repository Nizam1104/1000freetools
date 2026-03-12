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
  title: "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
  description: "Choose the right HVAC unit with our BTU calculator. Enter room size, insulation, and climate to determine the required heating or cooling capacity in BTUs per hour.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/hvac-btu-calculator",
  },
};

const tools = [
  {
    "name": "Hvac Airflow Calculator",
    "description": "HVAC Airflow Calculator – Calculate Required CFM",
    "href": "/calculators/hvac-airflow-calculator"
  },
  {
    "name": "Air Conditioner Tonnage Calculator",
    "description": "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room",
    "href": "/calculators/air-conditioner-tonnage-calculator"
  },
  {
    "name": "Chiller Tonnage Calculator",
    "description": "Chiller Tonnage Calculator – Calculate Cooling Capacity",
    "href": "/calculators/chiller-tonnage-calculator"
  },
  {
    "name": "Heat Pump Cop Calculator",
    "description": "Heat Pump COP Calculator – Coefficient of Performance",
    "href": "/calculators/heat-pump-cop-calculator"
  },
  {
    "name": "Boiler Efficiency Calculator",
    "description": "Boiler Efficiency Calculator – Calculate Boiler Efficiency",
    "href": "/calculators/boiler-efficiency-calculator"
  },
  {
    "name": "Ventilation Rate Calculator",
    "description": "Ventilation Rate Calculator – Calculate Required Airflow (ACH & CFM) per ASHRAE",
    "href": "/calculators/ventilation-rate-calculator"
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
                    <BreadcrumbLink href="/calculators/hvac-btu-calculator">Hvac Btu Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">HVAC BTU Calculator – What Size Air Conditioner Do You Need?</h1>
        <p className="text-muted-foreground">Choose the right HVAC unit with our BTU calculator. Enter room size, insulation, and climate to determine the required heating or cooling capacity in BTUs per hour.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
