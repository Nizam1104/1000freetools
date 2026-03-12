import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Scatter Plot Generator – Create Scatter Plots Online Free",
  description: "Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/scatter-plot-generator",
  },
  openGraph: {
    title: "Scatter Plot Generator – Create Scatter Plots Online Free",
    description: "Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/scatter-plot-generator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scatter Plot Generator – Create Scatter Plots Online Free",
    description: "Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.",
  },
};

const tools = [
  {
    "name": "Linear Regression Calculator – Find Best Fit Line Online",
    "description": "Perform linear regression analysis on any dataset with our free online linear regression calculator. Get the regression equation, slope, intercept, and R² value with a scatter plot.",
    "href": "/math-tools/linear-regression-calculator"
  },
  {
    "name": "Correlation Coefficient Calculator – Find Pearson r Online",
    "description": "Calculate the Pearson correlation coefficient between two variables with our free online calculator. Measure the strength and direction of linear relationships in your data.",
    "href": "/math-tools/correlation-coefficient-calculator"
  },
  {
    "name": "2D Function Plotter – Plot y = f(x) Graphs Online",
    "description": "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
    "href": "/math-tools/2d-function-plotter"
  },
  {
    "name": "Line Graph Builder – Create Line Charts Online Free",
    "description": "Build professional line graphs from any dataset with our free online line graph builder. Visualize trends, patterns, and changes over time with clean interactive charts.",
    "href": "/math-tools/line-graph-builder"
  },
  {
    "name": "Histogram Generator – Create Histograms Online Free",
    "description": "Create professional histograms from any dataset with our free online histogram generator. Customize bin sizes and view frequency distributions as visual bar charts instantly.",
    "href": "/math-tools/histogram-generator"
  },
  {
    "name": "Frequency Distribution Table Generator – Organize Data Online",
    "description": "Create a complete frequency distribution table from any dataset with our free online tool. Includes frequency, relative frequency, and cumulative frequency for easy data analysis.",
    "href": "/math-tools/frequency-distribution-table"
  },
  {
    "name": "Coordinate Plane Plotter – Plot Points & Lines Online",
    "description": "Plot points, lines, and geometric shapes on an interactive coordinate plane with our free online plotter. Ideal for graphing equations, visualizing geometry, and teaching math.",
    "href": "/math-tools/coordinate-plane-plotter"
  },
  {
    "name": "Coordinate Geometry Calculator – Distance, Slope, Midpoint Online",
    "description": "Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.",
    "href": "/math-tools/coordinate-geometry-calculator"
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
