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
  title: "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life",
  description: "Estimate your EV&apos;s effective battery capacity after degradation with our            EV Battery Capacity Estimator. Understand how aging and usage patterns affect            your range and plan accordingly for long trips.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ev-battery-capacity-estimator",
  },
};

const tools = [
  {
    "name": "Charging Cost Ev Calculator",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
    "href": "/calculators/charging-cost-ev-calculator"
  },
  {
    "name": "Range Estimator Ev",
    "description": "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
    "href": "/calculators/range-estimator-ev"
  },
  {
    "name": "Battery Backup Time Calculator",
    "description": "Battery Backup Time Calculator – How Long Will Your Battery Last?",
    "href": "/calculators/battery-backup-time-calculator"
  },
  {
    "name": "Battery Life Calculator",
    "description": "Battery Life Calculator – Calculate Battery Runtime",
    "href": "/calculators/battery-life-calculator"
  },
  {
    "name": "Vehicle Depreciation Calculator",
    "description": "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value",
    "href": "/calculators/vehicle-depreciation-calculator"
  },
  {
    "name": "Fuel Cost Calculator",
    "description": "Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly",
    "href": "/calculators/fuel-cost-calculator"
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
              <BreadcrumbLink href="/calculators/ev-battery-capacity-estimator">Ev Battery Capacity Estimator</BreadcrumbLink>
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
