import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SunburstChartCreator from "@/components/chart-tools/sunburst-chart-creator";
import SunburstChartCreatorSeo from "@/components/seo-content/chart-tools/sunburst-chart-creator";

export const metadata: Metadata = {
  title: `Sunburst Chart Generator | Create Hierarchical Charts`,
  description: `Free sunburst chart maker. Create multi-level pie charts for hierarchical data. Interactive drill-down, customizable colors. Export as PNG or HTML.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/sunburst-chart-creator`,
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

export default function SunburstChartCreatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Sunburst Chart Maker Online</h1>
        <p className="text-muted-foreground">
          Visualize hierarchical data with a sunburst chart. See proportions
          across multiple levels in a radial, multi-ring layout.
        </p>
      </header>
      <div className="mt-8">
        <SunburstChartCreator />
      </div>
      <div className="mt-8">
        <SunburstChartCreatorSeo />
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
