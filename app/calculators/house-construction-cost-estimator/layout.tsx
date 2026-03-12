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
  title: "House Construction Cost Estimator – Calculate Building Costs",
  description: "Estimate the total cost of building your dream home. Construction calculator factors in area, quality level, and location for realistic cost breakdowns.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/house-construction-cost-estimator",
  },
};

const tools = [
  {
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/calculators/brick-calculator"
  },
  {
    "name": "Concrete Volume Calculator",
    "description": "Concrete Volume Calculator",
    "href": "/calculators/concrete-volume-calculator"
  },
  {
    "name": "Paint Coverage Calculator",
    "description": "Paint Coverage Calculator",
    "href": "/calculators/paint-coverage-calculator"
  },
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator",
    "href": "/calculators/flooring-calculator"
  },
  {
    "name": "Tile Calculator",
    "description": "Tile Calculator",
    "href": "/calculators/tile-calculator"
  },
  {
    "name": "Roofing Sheets Calculator",
    "description": "Roofing Sheets Calculator",
    "href": "/calculators/roofing-sheets-calculator"
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
              <BreadcrumbLink href="/calculators/house-construction-cost-estimator">House Construction Cost Estimator</BreadcrumbLink>
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
