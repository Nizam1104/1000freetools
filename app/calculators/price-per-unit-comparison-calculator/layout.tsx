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
  title: "Price-Per-Unit Comparison Calculator",
  description: "Find the best value buy every time. Compare two or more products by normalizing their prices to a common unit to instantly identify the most cost-effective option.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/price-per-unit-comparison-calculator",
  },
};

const tools = [
  {
    "name": "Power Factor Calculator",
    "description": "Power Factor Calculator – Calculate PF and Phase Angle",
    "href": "/calculators/power-factor-calculator"
  },
  {
    "name": "Pregnancy Due Date Calculator",
    "description": "Pregnancy Due Date Calculator – When Is My Baby Due?",
    "href": "/calculators/pregnancy-due-date-calculator"
  },
  {
    "name": "Pregnancy Week Calculator",
    "description": "Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker",
    "href": "/calculators/pregnancy-week-calculator"
  },
  {
    "name": "Pregnancy Weight Gain Calculator",
    "description": "Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator",
    "href": "/calculators/pregnancy-weight-gain-calculator"
  },
  {
    "name": "Present Value Calculator",
    "description": "Present Value Calculator",
    "href": "/calculators/present-value-calculator"
  },
  {
    "name": "Prime Checker",
    "description": "Prime Number Checker – Is This Number Prime?",
    "href": "/calculators/prime-checker"
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
              <BreadcrumbLink href="/calculators/price-per-unit-comparison-calculator">Price Per Unit Comparison Calculator</BreadcrumbLink>
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
