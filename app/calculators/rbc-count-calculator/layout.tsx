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
  title: "RBC Count Calculator – Calculate Red Blood Cell Count from Hemocytometer",
  description: "Calculate red blood cell concentration from hemocytometer counts. Laboratory calculator uses Neubauer chamber calculations to determine RBC count per microliter.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rbc-count-calculator",
  },
};

const tools = [
  {
    "name": "Wbc Count Calculator",
    "description": "Wbc Count Calculator",
    "href": "/calculators/wbc-count-calculator"
  },
  {
    "name": "Hematocrit Calculator",
    "description": "Hematocrit Calculator",
    "href": "/calculators/hematocrit-calculator"
  },
  {
    "name": "Hemoglobin Calculator",
    "description": "Hemoglobin Calculator",
    "href": "/calculators/hemoglobin-calculator"
  },
  {
    "name": "Mcv Calculator",
    "description": "Mcv Calculator",
    "href": "/calculators/mcv-calculator"
  },
  {
    "name": "Blood Sugar Converter",
    "description": "Blood Sugar Converter",
    "href": "/calculators/blood-sugar-converter"
  },
  {
    "name": "Bmi Calculator",
    "description": "Bmi Calculator",
    "href": "/calculators/bmi-calculator"
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
              <BreadcrumbLink href="/calculators/rbc-count-calculator">Rbc Count Calculator</BreadcrumbLink>
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
