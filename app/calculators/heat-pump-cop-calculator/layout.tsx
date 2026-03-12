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
  title: "Heat Pump COP Calculator – Coefficient of Performance",
  description: "Calculate the Coefficient of Performance (COP) for heat pumps and compare to Carnot efficiency.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/heat-pump-cop-calculator",
  },
};

const tools = [
  {
    "name": "Boiler Efficiency Calculator",
    "description": "Boiler Efficiency Calculator – Calculate Boiler Efficiency",
    "href": "/calculators/boiler-efficiency-calculator"
  },
  {
    "name": "Air Conditioner Tonnage Calculator",
    "description": "AC Tonnage Calculator – Find the Right Air Conditioner Size for Your Room",
    "href": "/calculators/air-conditioner-tonnage-calculator"
  },
  {
    "name": "Hvac Btu Calculator",
    "description": "HVAC BTU Calculator – What Size Air Conditioner Do You Need?",
    "href": "/calculators/hvac-btu-calculator"
  },
  {
    "name": "Hvac Airflow Calculator",
    "description": "HVAC Airflow Calculator – Calculate Required CFM",
    "href": "/calculators/hvac-airflow-calculator"
  },
  {
    "name": "Chiller Tonnage Calculator",
    "description": "Chiller Tonnage Calculator – Calculate Cooling Capacity",
    "href": "/calculators/chiller-tonnage-calculator"
  },
  {
    "name": "Heat Transfer Calculator",
    "description": "Heat Transfer Calculator – Conduction, Convection & Radiation",
    "href": "/calculators/heat-transfer-calculator"
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
                    <BreadcrumbLink href="/calculators/heat-pump-cop-calculator">Heat Pump Cop Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Heat Pump COP Calculator – Coefficient of Performance</h1>
        <p className="text-muted-foreground">Calculate the Coefficient of Performance (COP) for heat pumps and compare to Carnot efficiency.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
