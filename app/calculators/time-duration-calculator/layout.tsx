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
  title: "Time Duration Calculator – Calculate Time Between Two Times",
  description: "Find the duration between any two times or dates. Free time calculator shows hours, minutes, and seconds between start and end times for scheduling and payroll.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/time-duration-calculator",
  },
};

const tools = [
  {
    "name": "Date Difference Calculator",
    "description": "Date Difference Calculator",
    "href": "/calculators/date-difference-calculator"
  },
  {
    "name": "Work Hours Calculator",
    "description": "Work Hours Calculator",
    "href": "/calculators/work-hours-calculator"
  },
  {
    "name": "Countdown Calculator",
    "description": "Countdown Calculator",
    "href": "/calculators/countdown-calculator"
  },
  {
    "name": "Unix Timestamp Converter",
    "description": "Unix Timestamp Converter",
    "href": "/calculators/unix-timestamp-converter"
  },
  {
    "name": "Business Days Calculator",
    "description": "Business Days Calculator",
    "href": "/calculators/business-days-calculator"
  },
  {
    "name": "Breathing Exercise Timer",
    "description": "Breathing Exercise Timer",
    "href": "/calculators/breathing-exercise-timer"
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
              <BreadcrumbLink href="/calculators/time-duration-calculator">Time Duration Calculator</BreadcrumbLink>
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
