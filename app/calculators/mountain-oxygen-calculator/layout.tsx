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
  title: "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
  description: "Understand how altitude affects your breathing with our Mountain Oxygen Calculator. Enter elevation in meters or feet to calculate available oxygen percentage and effective O₂ partial pressure — vital for mountaineers, climbers, and aviation planners.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mountain-oxygen-calculator",
  },
};

const tools = [
  {
    "name": "Altitude Sickness Risk Calculator",
    "description": "Altitude Sickness Risk Calculator – Assess Your Risk of AMS Before Climbing",
    "href": "/calculators/altitude-sickness-risk-calculator"
  },
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
    "name": "Air Density Calculator",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
    "href": "/calculators/air-density-calculator"
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
              <BreadcrumbLink href="/calculators/mountain-oxygen-calculator">Mountain Oxygen Calculator</BreadcrumbLink>
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
