import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "2D Function Plotter – Plot y = f(x) Graphs Online",
  description: "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/2d-function-plotter",
  },
  openGraph: {
    title: "2D Function Plotter – Plot y = f(x) Graphs Online",
    description: "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/2d-function-plotter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "2D Function Plotter – Plot y = f(x) Graphs Online",
    description: "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
  },
};

const tools = [
  {
    "name": "Coordinate Plane Plotter – Plot Points & Lines Online",
    "description": "Plot points, lines, and geometric shapes on an interactive coordinate plane with our free online plotter. Ideal for graphing equations, visualizing geometry, and teaching math.",
    "href": "/math-tools/coordinate-plane-plotter"
  },
  {
    "name": "Coordinate Geometry Calculator – Distance, Slope, Midpoint Online",
    "description": "Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.",
    "href": "/math-tools/coordinate-geometry-calculator"
  },
  {
    "name": "Slope Calculator – Find the Slope of a Line Online",
    "description": "Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.",
    "href": "/math-tools/slope-calculator"
  },
  {
    "name": "Scatter Plot Generator – Create Scatter Plots Online Free",
    "description": "Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.",
    "href": "/math-tools/scatter-plot-generator"
  },
  {
    "name": "Derivative Calculator – Differentiate Functions Step by Step",
    "description": "Calculate the derivative of any function with our free online derivative calculator. Applies power, product, quotient, and chain rules with detailed step-by-step differentiation shown.",
    "href": "/math-tools/derivative-calculator"
  },
  {
    "name": "Definite Integral Calculator – Compute Integrals Numerically",
    "description": "Calculate definite integrals numerically with our free online integral calculator. Evaluate the area under any function curve over any interval with accurate numerical results.",
    "href": "/math-tools/definite-integral-calculator"
  },
  {
    "name": "Polynomial Evaluator – Calculate Polynomial Value at Any x",
    "description": "Evaluate any polynomial expression at a given value of x with our free online polynomial evaluator. Supports polynomials of any degree with instant accurate results.",
    "href": "/math-tools/polynomial-evaluator"
  },
  {
    "name": "Linear Regression Calculator – Find Best Fit Line Online",
    "description": "Perform linear regression analysis on any dataset with our free online linear regression calculator. Get the regression equation, slope, intercept, and R² value with a scatter plot.",
    "href": "/math-tools/linear-regression-calculator"
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
