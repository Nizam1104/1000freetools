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
  title: "Depreciation Calculator",
  description: "Calculate how your asset's value decreases over time. Supports straight-line, declining balance, and sum-of-years-digits depreciation methods.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/depreciation-calculator",
  },
};

const tools = [
  {
    "name": "Vehicle Depreciation Calculator",
    "description": "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value",
    "href": "/calculators/vehicle-depreciation-calculator"
  },
  {
    "name": "Payback Period Calculator",
    "description": "Payback Period Calculator",
    "href": "/calculators/payback-period-calculator"
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
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/calculators/50-30-20-budget-rule-calculator"
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
              <BreadcrumbLink href="/calculators/depreciation-calculator">Depreciation Calculator</BreadcrumbLink>
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
