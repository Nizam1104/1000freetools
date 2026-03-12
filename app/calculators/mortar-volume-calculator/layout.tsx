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
  title: "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
  description: "Get precise mortar quantities for your construction project with our Mortar Volume Calculator.            Enter wall area, joint width and depth, and brick type to calculate the exact volume needed —            saving material and reducing waste.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mortar-volume-calculator",
  },
};

const tools = [
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
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/calculators/brick-calculator"
  },
  {
    "name": "Brick Bond Calculator",
    "description": "Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern",
    "href": "/calculators/brick-bond-calculator"
  },
  {
    "name": "Sand Quantity Calculator",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
    "href": "/calculators/sand-quantity-calculator"
  },
  {
    "name": "Asphalt Quantity Calculator",
    "description": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
    "href": "/calculators/asphalt-quantity-calculator"
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
              <BreadcrumbLink href="/calculators/mortar-volume-calculator">Mortar Volume Calculator</BreadcrumbLink>
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
