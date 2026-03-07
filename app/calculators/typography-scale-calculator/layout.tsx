import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Typography Scale Calculator – Generate a Harmonious Font Size Scale",
  description: "Create beautiful typographic hierarchies with our Typography Scale Calculator.            Enter your base font size and choose a scale ratio to generate a complete            heading scale — perfect for web designers and UI developers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/typography-scale-calculator",
  },
};

const tools = [
  {
    "name": "Line Height Calculator",
    "description": "Line-Height Calculator – Find the Optimal Line Spacing for Your Typography",
    "href": "/calculators/line-height-calculator"
  },
  {
    "name": "Golden Ratio Calculator",
    "description": "Golden Ratio Calculator",
    "href": "/calculators/golden-ratio-calculator"
  },
  {
    "name": "Golden Ratio Layout Generator",
    "description": "Golden Ratio Layout Generator – Design Perfectly Proportioned Layouts",
    "href": "/calculators/golden-ratio-layout-generator"
  },
  {
    "name": "Grid Layout Calculator",
    "description": "Grid Layout Calculator – Calculate Column Widths, Gutters & Margins for Web Design",
    "href": "/calculators/grid-layout-calculator"
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
