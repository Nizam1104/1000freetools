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
  title: "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
  description: "Avoid material shortages and over-ordering with our Sand Quantity Calculator. Enter the area and depth of your project to calculate the exact volume and weight of sand required in cubic meters, cubic feet, or tons.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/sand-quantity-calculator",
  },
};

const tools = [
  {
    "name": "Gravel Quantity Calculator",
    "description": "Gravel Quantity Calculator – Calculate Gravel Needed for Driveways & Landscaping",
    "href": "/calculators/gravel-quantity-calculator"
  },
  {
    "name": "Asphalt Quantity Calculator",
    "description": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
    "href": "/calculators/asphalt-quantity-calculator"
  },
  {
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/calculators/brick-calculator"
  },
  {
    "name": "Concrete Mix Ratio Calculator",
    "description": "Concrete Mix Ratio Calculator – Calculate Material Quantities",
    "href": "/calculators/concrete-mix-ratio-calculator"
  },
  {
    "name": "Concrete Volume Calculator",
    "description": "Concrete Volume Calculator – How Much Concrete Do You Need?",
    "href": "/calculators/concrete-volume-calculator"
  },
  {
    "name": "Mortar Volume Calculator",
    "description": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
    "href": "/calculators/mortar-volume-calculator"
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
              <BreadcrumbLink href="/calculators/sand-quantity-calculator">Sand Quantity Calculator</BreadcrumbLink>
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
