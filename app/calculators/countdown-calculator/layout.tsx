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
  title: "Countdown Timer Calculator – Calculate Time Remaining Until Any Date",
  description: "Track time remaining until important events, deadlines, or special occasions. Free countdown calculator shows days, hours, minutes, and seconds with live updates.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/countdown-calculator",
  },
};

const tools = [
  {
    "name": "Time Duration Calculator",
    "description": "Time Duration Calculator",
    "href": "/calculators/time-duration-calculator"
  },
  {
    "name": "Date Difference Calculator",
    "description": "Date Difference Calculator",
    "href": "/calculators/date-difference-calculator"
  },
  {
    "name": "Business Days Calculator",
    "description": "Business Days Calculator",
    "href": "/calculators/business-days-calculator"
  },
  {
    "name": "Week Number Calculator",
    "description": "Week Number Calculator",
    "href": "/calculators/week-number-calculator"
  },
  {
    "name": "Anniversary Calculator",
    "description": "Anniversary Calculator",
    "href": "/calculators/anniversary-calculator"
  },
  {
    "name": "Age Calculator",
    "description": "Age Calculator",
    "href": "/calculators/age-calculator"
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
              <BreadcrumbLink href="/calculators/countdown-calculator">Countdown Calculator</BreadcrumbLink>
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
