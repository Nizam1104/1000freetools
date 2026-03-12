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
  title: "Indoor CO₂ Level Estimator – Calculate CO₂ Concentration in Any Room",
  description: "Ensure healthy indoor air quality with our CO₂ Level Estimator. Enter room            dimensions, occupancy, and ventilation rate to estimate indoor CO₂            concentration in ppm — helping building managers and homeowners maintain            safe and productive environments.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/indoor-co-level-estimator",
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
    "name": "Greenhouse Ventilation Calculator",
    "description": "Greenhouse Ventilation Calculator – Calculate Fan Size & Airflow for Your Greenhouse",
    "href": "/calculators/greenhouse-ventilation-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
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
              <BreadcrumbLink href="/calculators/indoor-co-level-estimator">Indoor Co Level Estimator</BreadcrumbLink>
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
