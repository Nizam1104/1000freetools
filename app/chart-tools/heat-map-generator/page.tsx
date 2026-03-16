import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HeatMapGenerator from "@/components/chart-tools/heat-map-generator";
import HeatMapGeneratorSeo from "@/components/seo-content/chart-tools/heat-map-generator";

export const metadata: Metadata = {
  title: `Heat Map Generator | Create Data Heat Maps Free`,
  description: `Create heat maps online for free. Upload matrix data, choose color schemes, and generate visual intensity maps. Download as PNG image.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/heat-map-generator`,
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

export default function HeatMapGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Heat Map Creator Online</h1>
        <p className="text-muted-foreground">
          Turn matrix data into a visual heat map. Use color gradients to
          highlight patterns, correlations, and densities in your data.
        </p>
      </header>
      <div className="mt-8">
        <HeatMapGenerator />
      </div>
      <div className="mt-8">
        <HeatMapGeneratorSeo />
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
