import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities",
  description: "Ensure a perfect door fit with our Door Frame Calculator. Enter your door size            and wall thickness to calculate the exact frame dimensions and material            quantities needed for a professional installation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/door-frame-calculator",
  },
};

const tools = [
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/flooring-calculator"
  },
  {
    "name": "Staircase Rise Run Calculator",
    "description": "Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs",
    "href": "/staircase-rise-run-calculator"
  },
  {
    "name": "Ramp Slope Calculator",
    "description": "Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length",
    "href": "/ramp-slope-calculator"
  },
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/carpet-area-calculator"
  },
  {
    "name": "Window Area Calculator",
    "description": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
    "href": "/window-area-calculator"
  },
  {
    "name": "Ceiling Tile Calculator",
    "description": "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?",
    "href": "/ceiling-tile-calculator"
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
