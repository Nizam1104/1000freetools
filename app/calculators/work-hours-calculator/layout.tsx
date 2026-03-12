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
  title: "Work Hours Calculator – Calculate Hours Worked and Pay",
  description: "Calculate total hours worked and earnings from clock-in and clock-out times. Timesheet calculator handles breaks, overtime rates, and shows pay breakdown.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/work-hours-calculator",
  },
};

const tools = [
  {
    "name": "Time Duration Calculator",
    "description": "Time Duration Calculator",
    "href": "/calculators/time-duration-calculator"
  },
  {
    "name": "Hourly Wage to Salary Calculator",
    "description": "Hourly Wage to Salary Calculator",
    "href": "/calculators/hourly-wage-to-salary-calculator"
  },
  {
    "name": "Salary to Hourly Calculator",
    "description": "Salary to Hourly Calculator",
    "href": "/calculators/salary-to-hourly-calculator"
  },
  {
    "name": "Paycheck Calculator",
    "description": "Paycheck Calculator",
    "href": "/calculators/paycheck-calculator"
  },
  {
    "name": "Overtime Calculator",
    "description": "Overtime Calculator",
    "href": "/calculators/overtime-calculator"
  },
  {
    "name": "Time Card Calculator",
    "description": "Time Card Calculator",
    "href": "/calculators/time-card-calculator"
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
              <BreadcrumbLink href="/calculators/work-hours-calculator">Work Hours Calculator</BreadcrumbLink>
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
