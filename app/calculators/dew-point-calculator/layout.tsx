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
  title: "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity",
  description: "Calculate the dew point temperature instantly with our free Dew Point Calculator. Enter air temperature and relative humidity to determine when condensation will form — useful for weather forecasting, HVAC, and agriculture.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dew-point-calculator",
  },
};

const tools = [
  {
    "name": "Humidity Calculator",
    "description": "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
    "href": "/calculators/humidity-calculator"
  },
  {
    "name": "Air Density Calculator",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
    "href": "/calculators/air-density-calculator"
  },
  {
    "name": "Heat Index Calculator",
    "description": "Heat Index Calculator – Calculate the 'Feels Like' Temperature",
    "href": "/calculators/heat-index-calculator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/calculators/wind-chill-calculator"
  },
  {
    "name": "Ideal Gas Law Calculator",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
    "href": "/calculators/ideal-gas-law-calculator"
  },
  {
    "name": "Mountain Oxygen Calculator",
    "description": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
    "href": "/calculators/mountain-oxygen-calculator"
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
              <BreadcrumbLink href="/calculators/dew-point-calculator">Dew Point Calculator</BreadcrumbLink>
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
