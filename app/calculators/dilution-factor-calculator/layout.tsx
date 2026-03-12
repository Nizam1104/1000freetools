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
  title: "Dilution Factor Calculator – Calculate Solution Dilution Ratios",
  description: "Calculate dilution factors and volumes needed for preparing solutions. Laboratory calculator uses C1V1 = C2V2 formula for chemistry experiments and reagents.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dilution-factor-calculator",
  },
};

const tools = [
  {
    "name": "Dilution Calculator",
    "description": "Dilution Calculator",
    "href": "/calculators/dilution-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator",
    "href": "/calculators/concentration-calculator"
  },
  {
    "name": "Molarity Calculator",
    "description": "Molarity Calculator",
    "href": "/calculators/molarity-calculator"
  },
  {
    "name": "Solution Dilution Calculator",
    "description": "Solution Dilution Calculator",
    "href": "/calculators/solution-dilution-calculator"
  },
  {
    "name": "Percent Composition Calculator",
    "description": "Percent Composition Calculator",
    "href": "/calculators/percent-composition-calculator"
  },
  {
    "name": "Molality Calculator",
    "description": "Molality Calculator",
    "href": "/calculators/molality-calculator"
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
              <BreadcrumbLink href="/calculators/dilution-factor-calculator">Dilution Factor Calculator</BreadcrumbLink>
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
