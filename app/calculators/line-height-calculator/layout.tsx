import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Line-Height Calculator – Find the Optimal Line Spacing for Your Typography",
  description: "Improve readability with perfectly calculated line spacing using our Line-Height Calculator.            Enter your font size and column width to get recommended line-height values in px, em,            or unitless — following best practices for body text and headings.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/line-height-calculator",
  },
};

const tools = [
  {
    "name": "Typography Scale Calculator",
    "description": "Typography Scale Calculator – Generate a Harmonious Font Size Scale",
    "href": "/typography-scale-calculator"
  },
  {
    "name": "Golden Ratio Calculator",
    "description": "Golden Ratio Calculator",
    "href": "/golden-ratio-calculator"
  },
  {
    "name": "Golden Ratio Layout Generator",
    "description": "Golden Ratio Layout Generator – Design Perfectly Proportioned Layouts",
    "href": "/golden-ratio-layout-generator"
  },
  {
    "name": "Grid Layout Calculator",
    "description": "Grid Layout Calculator – Calculate Column Widths, Gutters & Margins for Web Design",
    "href": "/grid-layout-calculator"
  },
  {
    "name": "Canvas Aspect Ratio Calculator",
    "description": "Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions",
    "href": "/canvas-aspect-ratio-calculator"
  },
  {
    "name": "Perspective Angle Calculator",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
    "href": "/perspective-angle-calculator"
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
