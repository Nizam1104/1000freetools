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
  title: "Slope Calculator",
  description: "Calculate slope and line equation from two points",
  alternates: {
    canonical: "https://1000freetools.com/calculators/slope-calculator",
  },
};

const tools = [
  {
    "name": "Distance Formula Calculator",
    "description": "Distance Formula Calculator – Find Distance Between Two Points",
    "href": "/calculators/distance-formula-calculator"
  },
  {
    "name": "Pythagorean Theorem Calculator",
    "description": "Pythagorean Theorem Calculator",
    "href": "/calculators/pythagorean-theorem-calculator"
  },
  {
    "name": "Ramp Slope Calculator",
    "description": "Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length",
    "href": "/calculators/ramp-slope-calculator"
  },
  {
    "name": "Staircase Rise Run Calculator",
    "description": "Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs",
    "href": "/calculators/staircase-rise-run-calculator"
  },
  {
    "name": "Linear Equation Solver",
    "description": "Linear Equation Solver – Solve ax + b = 0",
    "href": "/calculators/linear-equation-solver"
  },
  {
    "name": "Circle Area Calculator",
    "description": "Circle Area Calculator",
    "href": "/calculators/circle-area-calculator"
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
                    <BreadcrumbLink href="/calculators/slope-calculator">Slope Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Slope Calculator</h1>
        <p className="text-muted-foreground">Calculate slope and line equation from two points</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
