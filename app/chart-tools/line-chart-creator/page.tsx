import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import LineChartCreator from "@/components/chart-tools/line-chart-creator";
import LineChartCreatorSeo from "@/components/seo-content/chart-tools/line-chart-creator";

export const metadata: Metadata = {
  title: `Free Line Chart Creator | Make Line Graphs Online`,
  description: `Create line charts and area graphs online for free. Plot time-series data, customize lines and markers, and download or embed your chart. No registration.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/line-chart-creator`,
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
    name: `Scatter Plot Tool`,
    description: `Scatter Plot Maker & Generator`,
    href: `/chart-tools/scatter-plot-tool`,
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

export default function LineChartCreatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Line Chart Creator Online</h1>
        <p className="text-muted-foreground">
          Visualize trends and changes over time with our line chart tool. Plot
          multiple series, customize styles, and create clear, professional
          charts.
        </p>
      </header>
      <div className="mt-8">
        <LineChartCreator />
      </div>
      <div className="mt-8">
        <LineChartCreatorSeo />
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
