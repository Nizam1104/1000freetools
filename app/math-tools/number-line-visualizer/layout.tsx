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
  title: "Number Line Visualizer – Plot Numbers on a Number Line",
  description: "Visualize numbers, fractions, and inequalities on an interactive number line with our free online number line tool. Plot points and ranges to better understand number concepts.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/number-line-visualizer",
  },
  openGraph: {
    title: "Number Line Visualizer – Plot Numbers on a Number Line",
    description: "Visualize numbers, fractions, and inequalities on an interactive number line with our free online number line tool. Plot points and ranges to better understand number concepts.",
    type: "website",
    url: "https://1000freetools.com/math-tools/number-line-visualizer",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Line Visualizer – Plot Numbers on a Number Line",
    description: "Visualize numbers, fractions, and inequalities on an interactive number line with our free online number line tool. Plot points and ranges to better understand number concepts.",
  },
};

const tools = [
  {
    "name": "Coordinate Plane Plotter – Plot Points & Lines Online",
    "description": "Plot points, lines, and geometric shapes on an interactive coordinate plane with our free online plotter. Ideal for graphing equations, visualizing geometry, and teaching math.",
    "href": "/math-tools/coordinate-plane-plotter"
  },
  {
    "name": "Linear Inequality Solver – Solve and Graph Inequalities Online",
    "description": "Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.",
    "href": "/math-tools/inequality-solver"
  },
  {
    "name": "Absolute Value Calculator – Find |x| of Any Number",
    "description": "Calculate the absolute value of any number or expression instantly with our free online absolute value calculator. Supports positive, negative, and decimal numbers.",
    "href": "/math-tools/absolute-value-calculator"
  },
  {
    "name": "Linear Equation Solver – Solve ax + b = c Online",
    "description": "Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.",
    "href": "/math-tools/linear-equation-solver"
  },
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
    "name": "2D Function Plotter – Plot y = f(x) Graphs Online",
    "description": "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
    "href": "/math-tools/2d-function-plotter"
  },
  {
    "name": "Number Sorter – Sort Numbers Ascending or Descending Online",
    "description": "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
    "href": "/math-tools/number-sorter"
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
              <BreadcrumbLink href="/math-tools/number-line-visualizer">Number Line Visualizer</BreadcrumbLink>
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
