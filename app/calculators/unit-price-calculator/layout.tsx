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
  title: "Unit Price Calculator",
  description: "Calculate the cost per unit of any product or purchase. Enter total quantity and total cost to find the per-unit price and assess cost efficiency.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/unit-price-calculator",
  },
};

const tools = [
  {
    "name": "Trapezoid Area Calculator",
    "description": "Trapezoid Area Calculator",
    "href": "/calculators/trapezoid-area-calculator"
  },
  {
    "name": "Triangle Area Calculator",
    "description": "Triangle Area Calculator – Find Area from Base and Height",
    "href": "/calculators/triangle-area-calculator"
  },
  {
    "name": "Trip Cost Estimator",
    "description": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
    "href": "/calculators/trip-cost-estimator"
  },
  {
    "name": "Tuning Frequency Converter",
    "description": "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch",
    "href": "/calculators/tuning-frequency-converter"
  },
  {
    "name": "Typography Scale Calculator",
    "description": "Typography Scale Calculator – Generate a Harmonious Font Size Scale",
    "href": "/calculators/typography-scale-calculator"
  },
  {
    "name": "Ups Generator Runtime Calculator",
    "description": "UPS & Generator Runtime Calculator – How Long Will Your Backup Power Last?",
    "href": "/calculators/ups-generator-runtime-calculator"
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
              <BreadcrumbLink href="/calculators/unit-price-calculator">Unit Price Calculator</BreadcrumbLink>
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
