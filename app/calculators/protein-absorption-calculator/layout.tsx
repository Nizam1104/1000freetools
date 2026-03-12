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
  title: "Protein Absorption Calculator – Calculate Protein Uptake Rate",
  description: "Estimate how quickly your body absorbs different types of protein. Calculate absorption rates for whey, casein, and other protein sources for optimal muscle building.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/protein-absorption-calculator",
  },
};

const tools = [
  {
    "name": "Protein Intake Calculator",
    "description": "Protein Intake Calculator",
    "href": "/calculators/protein-intake-calculator"
  },
  {
    "name": "Protein Distribution Calculator",
    "description": "Protein Distribution Calculator",
    "href": "/calculators/protein-distribution-calculator"
  },
  {
    "name": "Macro Calculator",
    "description": "Macro Calculator",
    "href": "/calculators/macro-calculator"
  },
  {
    "name": "Ketogenic Macro Calculator",
    "description": "Ketogenic Macro Calculator",
    "href": "/calculators/ketogenic-macro-calculator"
  },
  {
    "name": "Protein Absorption Calculator",
    "description": "Protein Absorption Calculator",
    "href": "/calculators/protein-absorption-calculator"
  },
  {
    "name": "Bmr Calculator",
    "description": "Bmr Calculator",
    "href": "/calculators/bmr-calculator"
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
              <BreadcrumbLink href="/calculators/protein-absorption-calculator">Protein Absorption Calculator</BreadcrumbLink>
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
