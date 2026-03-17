import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BubbleChartCreator from "@/components/chart-tools/bubble-chart-creator";
import BubbleChartCreatorSeo from "@/components/seo-content/chart-tools/bubble-chart-creator";

export const metadata: Metadata = {
  title: `Bubble Chart Maker | Create Interactive Bubble Plots`,
  description: `Free bubble chart creator. Visualize 3D data with X, Y, and bubble size. Customize colors and labels. Download as PNG or interactive HTML.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/bubble-chart-creator`,
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

export default function BubbleChartCreatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Bubble Chart Maker & Generator
        </h1>
        <p className="text-muted-foreground">
          Plot three-dimensional data on a bubble chart. Use position and bubble
          size to compare multiple variables in a single, clear visualization.
        </p>
      </header>
      <div className="mt-8">
        <BubbleChartCreator />
      </div>
      <div className="mt-8">
        <BubbleChartCreatorSeo />
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
