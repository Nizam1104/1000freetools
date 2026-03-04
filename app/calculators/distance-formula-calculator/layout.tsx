import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Distance Formula Calculator – Find Distance Between Two Points",
  description: "Calculate the straight-line distance between any two points on a coordinate plane. Enter the x and y coordinates to get the distance and midpoint instantly.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/distance-formula-calculator",
  },
};

const tools = [
  {
    "name": "Pythagorean Theorem Calculator",
    "description": "Pythagorean Theorem Calculator",
    "href": "/pythagorean-theorem-calculator"
  },
  {
    "name": "Slope Calculator",
    "description": "Slope Calculator",
    "href": "/slope-calculator"
  },
  {
    "name": "Linear Equation Solver",
    "description": "Linear Equation Solver – Solve ax + b = 0",
    "href": "/linear-equation-solver"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/4-percent-rule-retirement-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Distance Formula Calculator – Find Distance Between Two Points</h1>
        <p className="text-muted-foreground">Calculate the straight-line distance between any two points on a coordinate plane. Enter the x and y coordinates to get the distance and midpoint instantly.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
