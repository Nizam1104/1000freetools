import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PieChartMaker from "@/components/chart-tools/pie-chart-maker";
import PieChartMakerSeo from "@/components/seo-content/chart-tools/pie-chart-maker";

export const metadata: Metadata = {
  title: `Free Pie Chart Maker | Create Custom Pie Charts Online`,
  description: `Create and download custom pie charts for free. Upload data, adjust colors, labels, and donut hole size. Export as PNG, SVG, or PDF. No sign-up required.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/pie-chart-maker`,
  },
};

const tools = [
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

export default function PieChartMakerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free Pie Chart Maker Online</h1>
        <p className="text-muted-foreground">
          Make a pie chart in seconds. Our free tool lets you visualize
          proportions easily. Upload your data, customize colors and labels, and
          download a high-quality image.
        </p>
      </header>
      <div className="mt-8">
        <PieChartMaker />
      </div>
      <div className="mt-8">
        <PieChartMakerSeo />
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
