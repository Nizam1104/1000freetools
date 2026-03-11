import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ScatterPlotTool from "@/components/chart-tools/scatter-plot-tool";
import ScatterPlotToolSeo from "@/components/seo-content/chart-tools/scatter-plot-tool";

export const metadata: Metadata = {
  title: `Scatter Plot Maker | Create XY Scatter Plots Online`,
  description: `Free online scatter plot maker. Visualize correlations, add trend lines and customize points. Upload data and download your scatter plot as PNG or SVG.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/scatter-plot-tool`,
  },
};

const tools = [
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
  {
    name: `Bar Graph Generator`,
    description: `Bar Graph Generator & Maker`,
    href: `/chart-tools/bar-graph-generator`,
  },
  {
    name: `Line Chart Creator`,
    description: `Line Chart Creator Online`,
    href: `/chart-tools/line-chart-creator`,
  },
  {
    name: `Histogram Generator`,
    description: `Histogram Maker Online`,
    href: `/chart-tools/histogram-generator`,
  },
  {
    name: `Gantt Chart Maker`,
    description: `Free Gantt Chart Maker`,
    href: `/chart-tools/gantt-chart-maker`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `CRON Expression Generator`,
    description: `Free CRON Expression Generator`,
    href: `/cron-expression-tools/cron-expression-generator`,
  },
];

export default function ScatterPlotToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Scatter Plot Maker & Generator
        </h1>
        <p className="text-muted-foreground">
          Analyze correlations and distributions with a scatter plot. Our tool
          helps you spot patterns, add trend lines, and create publication-ready
          charts.
        </p>
      </header>
      <div className="mt-8">
        <ScatterPlotTool />
      </div>
      <div className="mt-8">
        <ScatterPlotToolSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
