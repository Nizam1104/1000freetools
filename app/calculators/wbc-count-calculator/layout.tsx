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
  title: "WBC Count Calculator – Calculate White Blood Cell Count from Hemocytometer",
  description: "Calculate white blood cell concentration from hemocytometer counts. Laboratory calculator determines WBC count per microliter for immune system assessment.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wbc-count-calculator",
  },
};

const tools = [
  {
    "name": "Rbc Count Calculator",
    "description": "Rbc Count Calculator",
    "href": "/calculators/rbc-count-calculator"
  },
  {
    "name": "Hemoglobin Calculator",
    "description": "Hemoglobin Calculator",
    "href": "/calculators/hemoglobin-calculator"
  },
  {
    "name": "Blood Sugar Converter",
    "description": "Blood Sugar Converter",
    "href": "/calculators/blood-sugar-converter"
  },
  {
    "name": "Kidney Function Egfr Calculator",
    "description": "Kidney Function Egfr Calculator",
    "href": "/calculators/kidney-function-egfr-calculator"
  },
  {
    "name": "Cholesterol Ratio Calculator",
    "description": "Cholesterol Ratio Calculator",
    "href": "/calculators/cholesterol-ratio-calculator"
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
              <BreadcrumbLink href="/calculators/wbc-count-calculator">Wbc Count Calculator</BreadcrumbLink>
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
