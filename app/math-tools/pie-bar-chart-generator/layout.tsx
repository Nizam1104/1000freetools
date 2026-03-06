import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pie & Bar Chart Generator – Create Charts Online Free",
  description: "Create professional pie charts and bar charts from your data with our free online chart generator. Enter labels and values to instantly visualize your data beautifully.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/pie-bar-chart-generator",
  },
  openGraph: {
    title: "Pie & Bar Chart Generator – Create Charts Online Free",
    description: "Create professional pie charts and bar charts from your data with our free online chart generator. Enter labels and values to instantly visualize your data beautifully.",
    type: "website",
    url: "https://1000freetools.com/math-tools/pie-bar-chart-generator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pie & Bar Chart Generator – Create Charts Online Free",
    description: "Create professional pie charts and bar charts from your data with our free online chart generator. Enter labels and values to instantly visualize your data beautifully.",
  },
};

const tools = [
  {
    "name": "Bar Chart Builder – Create Bar Charts Online Free",
    "description": "Build professional bar charts from any categorical data with our free online bar chart builder. Compare values across categories with clean, customizable bar graph visualizations.",
    "href": "/math-tools/bar-chart-builder"
  },
  {
    "name": "Pie Chart Builder – Create Pie Charts Online Free",
    "description": "Create professional pie charts from any proportional data with our free online pie chart builder. Visualize percentages and part-to-whole relationships with clear labeled segments.",
    "href": "/math-tools/pie-chart-builder"
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
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
  },
  {
    "name": "Scatter Plot Generator – Create Scatter Plots Online Free",
    "description": "Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.",
    "href": "/math-tools/scatter-plot-generator"
  },
  {
    "name": "Line Graph Builder – Create Line Charts Online Free",
    "description": "Build professional line graphs from any dataset with our free online line graph builder. Visualize trends, patterns, and changes over time with clean interactive charts.",
    "href": "/math-tools/line-graph-builder"
  },
  {
    "name": "Box Plot Generator – Create Box and Whisker Plots Online",
    "description": "Generate box plots (box-and-whisker plots) from any dataset with our free online box plot generator. Visualize quartiles, median, and outliers with a clear and accurate diagram.",
    "href": "/math-tools/box-plot-generator"
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
