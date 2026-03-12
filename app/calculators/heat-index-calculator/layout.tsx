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
  title: "Heat Index Calculator – Calculate the 'Feels Like' Temperature",
  description: "Know how hot it really feels outside with our Heat Index Calculator. Combine air temperature and humidity to calculate the apparent temperature — helping you prepare for heat-related risks during summer and outdoor activities.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/heat-index-calculator",
  },
};

const tools = [
  {
    "name": "Dew Point Calculator",
    "description": "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity",
    "href": "/calculators/dew-point-calculator"
  },
  {
    "name": "Humidity Calculator",
    "description": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
    "href": "/calculators/humidity-calculator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/calculators/wind-chill-calculator"
  },
  {
    "name": "Air Density Calculator",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
    "href": "/calculators/air-density-calculator"
  },
  {
    "name": "Mountain Oxygen Calculator",
    "description": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
    "href": "/calculators/mountain-oxygen-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
              <BreadcrumbLink href="/calculators/heat-index-calculator">Heat Index Calculator</BreadcrumbLink>
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
