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
  title: "Slope Calculator – Find the Slope of a Line Online",
  description: "Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/slope-calculator",
  },
  openGraph: {
    title: "Slope Calculator – Find the Slope of a Line Online",
    description: "Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.",
    type: "website",
    url: "https://1000freetools.com/calculators/slope-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slope Calculator – Find the Slope of a Line Online",
    description: "Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.",
  },
};

const tools = [
  {
    "name": "Distance Between Two Points Calculator – Find Distance Online",
    "description": "Find the distance between any two points on a coordinate plane using our free online distance formula calculator. Supports 2D and 3D coordinates with instant accurate results.",
    "href": "/math-tools/distance-between-two-points-calculator"
  },
  {
    "name": "Midpoint Calculator – Find the Midpoint of a Line Segment",
    "description": "Calculate the midpoint between any two coordinate points with our free online midpoint calculator. Get the exact midpoint coordinates with the midpoint formula shown clearly.",
    "href": "/math-tools/midpoint-calculator"
  },
  {
    "name": "Coordinate Geometry Calculator – Distance, Slope, Midpoint Online",
    "description": "Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.",
    "href": "/math-tools/coordinate-geometry-calculator"
  },
  {
    "name": "Coordinate Plane Plotter – Plot Points & Lines Online",
    "description": "Plot points, lines, and geometric shapes on an interactive coordinate plane with our free online plotter. Ideal for graphing equations, visualizing geometry, and teaching math.",
    "href": "/math-tools/coordinate-plane-plotter"
  },
  {
    "name": "Linear Regression Calculator – Find Best Fit Line Online",
    "description": "Perform linear regression analysis on any dataset with our free online linear regression calculator. Get the regression equation, slope, intercept, and R² value with a scatter plot.",
    "href": "/math-tools/linear-regression-calculator"
  },
  {
    "name": "Gradient Calculator – Find Slope of a Function at a Point",
    "description": "Calculate the gradient or slope of any function at a specific point with our free online gradient calculator. Uses differentiation to find the exact rate of change at any x value.",
    "href": "/math-tools/gradient-slope-calculator"
  },
  {
    "name": "2D Function Plotter – Plot y = f(x) Graphs Online",
    "description": "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
    "href": "/math-tools/2d-function-plotter"
  },
  {
    "name": "Linear Equation Solver – Solve ax + b = c Online",
    "description": "Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.",
    "href": "/math-tools/linear-equation-solver"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/slope-calculator">Slope Calculator</BreadcrumbLink>
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
