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
  title: "Speed Calculator – Calculate Speed from Distance and Time",
  description: "Calculate average speed from distance traveled and time taken. Free speed calculator converts between km/h, mph, m/s, and knots for running, cycling, or driving.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/speed-calculator",
  },
};

const tools = [
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
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
    "name": "Velocity Calculator",
    "description": "Velocity Calculator",
    "href": "/calculators/velocity-calculator"
  },
  {
    "name": "Distance Formula Calculator",
    "description": "Distance Formula Calculator",
    "href": "/calculators/distance-formula-calculator"
  },
  {
    "name": "Time Duration Calculator",
    "description": "Time Duration Calculator",
    "href": "/calculators/time-duration-calculator"
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
              <BreadcrumbLink href="/calculators/speed-calculator">Speed Calculator</BreadcrumbLink>
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
