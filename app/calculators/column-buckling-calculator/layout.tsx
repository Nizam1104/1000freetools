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
  title: "Column Buckling Calculator – Calculate Critical Buckling Load",
  description: "Calculate the critical buckling load for columns using Euler's formula. Essential for structural engineering, mechanical design, and ensuring column stability.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/column-buckling-calculator",
  },
};

const tools = [
  {
    "name": "Beam Bending Calculator",
    "description": "Beam Bending Calculator",
    "href": "/calculators/beam-bending-calculator"
  },
  {
    "name": "Stress Strain Calculator",
    "description": "Stress Strain Calculator",
    "href": "/calculators/stress-strain-calculator"
  },
  {
    "name": "Safety Factor Calculator",
    "description": "Safety Factor Calculator",
    "href": "/calculators/safety-factor-calculator"
  },
  {
    "name": "Moment of Inertia Calculator",
    "description": "Moment of Inertia Calculator",
    "href": "/calculators/moment-of-inertia-calculator"
  },
  {
    "name": "Steel Weight Calculator",
    "description": "Steel Weight Calculator",
    "href": "/calculators/steel-weight-calculator"
  },
  {
    "name": "Fastener Load Calculator",
    "description": "Fastener Load Calculator",
    "href": "/calculators/fastener-load-calculator"
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
              <BreadcrumbLink href="/calculators/column-buckling-calculator">Column Buckling Calculator</BreadcrumbLink>
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
