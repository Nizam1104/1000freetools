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
  title: "Cooper Test Calculator – Calculate VO2 Max from 12-Minute Run",
  description: "Estimate your VO2 max and aerobic fitness with the Cooper 12-minute run test. Used by athletes, military, and fitness professionals to assess cardiovascular endurance.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cooper-test-calculator",
  },
};

const tools = [
  {
    "name": "Vo2 Max Calculator",
    "description": "Vo2 Max Calculator",
    "href": "/calculators/vo2-max-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator",
    "href": "/calculators/marathon-pace-calculator"
  },
  {
    "name": "Heart Rate Zones Calculator",
    "description": "Heart Rate Zones Calculator",
    "href": "/calculators/heart-rate-zones-calculator"
  },
  {
    "name": "Lactate Threshold Calculator",
    "description": "Lactate Threshold Calculator",
    "href": "/calculators/lactate-threshold-calculator"
  },
  {
    "name": "Bmi Calculator",
    "description": "Bmi Calculator",
    "href": "/calculators/bmi-calculator"
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
              <BreadcrumbLink href="/calculators/cooper-test-calculator">Cooper Test Calculator</BreadcrumbLink>
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
