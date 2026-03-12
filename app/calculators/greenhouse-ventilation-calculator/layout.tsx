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
  title: "Greenhouse Ventilation Calculator – Calculate Fan Size & Airflow for Your Greenhouse",
  description: "Maintain ideal growing conditions with our Greenhouse Ventilation Calculator. Enter            your greenhouse dimensions, plant density, and target temperature to calculate the            required air exchange rate and recommended fan capacity.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/greenhouse-ventilation-calculator",
  },
};

const tools = [
  {
    "name": "Ventilation Rate Calculator",
    "description": "Ventilation Rate Calculator – Calculate Required Airflow (ACH & CFM) per ASHRAE",
    "href": "/calculators/ventilation-rate-calculator"
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
    "name": "Indoor Co Level Estimator",
    "description": "Indoor CO₂ Level Estimator – Calculate CO₂ Concentration in Any Room",
    "href": "/calculators/indoor-co-level-estimator"
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
              <BreadcrumbLink href="/calculators/greenhouse-ventilation-calculator">Greenhouse Ventilation Calculator</BreadcrumbLink>
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
