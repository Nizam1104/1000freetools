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
  title: "Payback Period Calculator",
  description: "Determine how quickly an investment pays for itself. Calculate the number of years or months needed to recover the initial cost from generated cash flows.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/payback-period-calculator",
  },
};

const tools = [
  {
    "name": "Irr Calculator",
    "description": "IRR Calculator – Internal Rate of Return",
    "href": "/calculators/irr-calculator"
  },
  {
    "name": "Npv Calculator",
    "description": "NPV Calculator – Net Present Value",
    "href": "/calculators/npv-calculator"
  },
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/calculators/roi-calculator"
  },
  {
    "name": "Cost Of Capital Calculator",
    "description": "Cost of Capital Calculator",
    "href": "/calculators/cost-of-capital-calculator"
  },
  {
    "name": "Wacc Calculator",
    "description": "WACC Calculator – Weighted Average Cost of Capital",
    "href": "/calculators/wacc-calculator"
  },
  {
    "name": "Ebitda Calculator",
    "description": "EBITDA Calculator",
    "href": "/calculators/ebitda-calculator"
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
              <BreadcrumbLink href="/calculators/payback-period-calculator">Payback Period Calculator</BreadcrumbLink>
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
