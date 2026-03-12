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
  title: "Golden Ratio Layout Generator – Design Perfectly Proportioned Layouts",
  description: "Create visually harmonious designs with our Golden Ratio Layout Generator.            Enter your canvas dimensions to generate golden ratio subdivisions, rectangles,            and spiral guides — the mathematical foundation of beautiful graphic design            and architecture.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/golden-ratio-layout-generator",
  },
};

const tools = [
  {
    "name": "Golden Ratio Calculator",
    "description": "Golden Ratio Calculator",
    "href": "/calculators/golden-ratio-calculator"
  },
  {
    "name": "Grid Layout Calculator",
    "description": "Grid Layout Calculator – Calculate Column Widths, Gutters & Margins for Web Design",
    "href": "/calculators/grid-layout-calculator"
  },
  {
    "name": "Line Height Calculator",
    "description": "Line-Height Calculator – Find the Optimal Line Spacing for Your Typography",
    "href": "/calculators/line-height-calculator"
  },
  {
    "name": "Typography Scale Calculator",
    "description": "Typography Scale Calculator – Generate a Harmonious Font Size Scale",
    "href": "/calculators/typography-scale-calculator"
  },
  {
    "name": "Canvas Aspect Ratio Calculator",
    "description": "Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions",
    "href": "/calculators/canvas-aspect-ratio-calculator"
  },
  {
    "name": "Perspective Angle Calculator",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
    "href": "/calculators/perspective-angle-calculator"
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
              <BreadcrumbLink href="/calculators/golden-ratio-layout-generator">Golden Ratio Layout Generator</BreadcrumbLink>
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
