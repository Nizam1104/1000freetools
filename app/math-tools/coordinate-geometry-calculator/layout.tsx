import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Coordinate Geometry Calculator – Distance, Slope, Midpoint Online",
  description: "Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/coordinate-geometry-calculator",
  },
  openGraph: {
    title: "Coordinate Geometry Calculator – Distance, Slope, Midpoint Online",
    description: "Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/coordinate-geometry-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coordinate Geometry Calculator – Distance, Slope, Midpoint Online",
    description: "Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.",
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
    "name": "Slope Calculator – Find the Slope of a Line Online",
    "description": "Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.",
    "href": "/math-tools/slope-calculator"
  },
  {
    "name": "Coordinate Plane Plotter – Plot Points & Lines Online",
    "description": "Plot points, lines, and geometric shapes on an interactive coordinate plane with our free online plotter. Ideal for graphing equations, visualizing geometry, and teaching math.",
    "href": "/math-tools/coordinate-plane-plotter"
  },
  {
    "name": "2D Function Plotter – Plot y = f(x) Graphs Online",
    "description": "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
    "href": "/math-tools/2d-function-plotter"
  },
  {
    "name": "Pythagorean Theorem Calculator – Find Any Side of a Right Triangle",
    "description": "Solve for any missing side of a right triangle using the Pythagorean theorem with our free online calculator. Enter two sides and instantly find the third with step-by-step working.",
    "href": "/math-tools/pythagorean-theorem-calculator"
  },
  {
    "name": "Triangle Solver – Solve Any Triangle SSS SAS ASA AAS",
    "description": "Solve any triangle completely using SSS, SAS, ASA, or AAS methods with our free online triangle solver. Find all missing sides, angles, and area with step-by-step trigonometric solutions.",
    "href": "/math-tools/triangle-solver"
  },
  {
    "name": "Triangle Angle Calculator – Find Missing Angles in a Triangle",
    "description": "Find any missing angle in a triangle with our free online angle calculator. Enter known angles or sides and instantly solve for the remaining angles using trigonometry rules.",
    "href": "/math-tools/angle-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
