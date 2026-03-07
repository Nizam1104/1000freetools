import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length",
  description: "Design accessible and safe ramps with our Ramp Slope Calculator. Enter the rise and run to calculate slope percentage, gradient ratio, and ramp angle — ensuring ADA or building code compliance for wheelchair ramps and loading docks.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ramp-slope-calculator",
  },
};

const tools = [
  {
    "name": "Staircase Rise Run Calculator",
    "description": "Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs",
    "href": "/calculators/staircase-rise-run-calculator"
  },
  {
    "name": "Slope Calculator",
    "description": "Slope Calculator",
    "href": "/calculators/slope-calculator"
  },
  {
    "name": "Door Frame Calculator",
    "description": "Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities",
    "href": "/calculators/door-frame-calculator"
  },
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/calculators/flooring-calculator"
  },
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/calculators/carpet-area-calculator"
  },
  {
    "name": "Window Area Calculator",
    "description": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
    "href": "/calculators/window-area-calculator"
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
