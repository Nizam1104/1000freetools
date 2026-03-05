import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs",
  description: "Design code-compliant and comfortable stairs with our Staircase Rise/Run Calculator. Enter the total height and available horizontal space to calculate optimal riser height, tread depth, and number of steps for your staircase.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/staircase-rise-run-calculator",
  },
};

const tools = [
  {
    "name": "Ramp Slope Calculator",
    "description": "Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length",
    "href": "/ramp-slope-calculator"
  },
  {
    "name": "Slope Calculator",
    "description": "Slope Calculator",
    "href": "/slope-calculator"
  },
  {
    "name": "Door Frame Calculator",
    "description": "Door Frame Calculator – Calculate Door Frame Dimensions & Material Quantities",
    "href": "/door-frame-calculator"
  },
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/flooring-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs</h1>
        <p className="text-muted-foreground">Design code-compliant and comfortable stairs with our Staircase Rise/Run Calculator. Enter the total height and available horizontal space to calculate optimal riser height, tread depth, and number of steps for your staircase.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
