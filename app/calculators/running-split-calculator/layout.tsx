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
  title: "Running Split Calculator – Calculate Pace and Race Projections",
  description: "Calculate your running pace per kilometer or mile and project finish times for 5K, 10K, half marathon, and marathon. Free running split calculator with race time predictions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/running-split-calculator",
  },
};

const tools = [
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator",
    "href": "/calculators/marathon-pace-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Speed Calculator",
    "description": "Speed Calculator",
    "href": "/calculators/speed-calculator"
  },
  {
    "name": "Pace to Speed Converter",
    "description": "Pace to Speed Converter",
    "href": "/calculators/pace-to-speed-converter"
  },
  {
    "name": "Speed to Pace Converter",
    "description": "Speed to Pace Converter",
    "href": "/calculators/speed-to-pace-converter"
  },
  {
    "name": "Cooper Test Calculator",
    "description": "Cooper Test Calculator",
    "href": "/calculators/cooper-test-calculator"
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
              <BreadcrumbLink href="/calculators/running-split-calculator">Running Split Calculator</BreadcrumbLink>
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
