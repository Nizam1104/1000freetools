import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BarGraphGenerator from "@/components/chart-tools/bar-graph-generator";
import BarGraphGeneratorSeo from "@/components/seo-content/chart-tools/bar-graph-generator";

export const metadata: Metadata = {
  title: `Bar Graph Generator | Create Bar Charts Online for Free`,
  description: `Generate bar graphs and charts online for free. Customize colors, labels, and orientation. Import data from Excel and download as PNG or SVG instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/bar-graph-generator`,
  },
};

const tools = [
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
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

export default function BarGraphGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bar Graph Generator & Maker</h1>
        <p className="text-muted-foreground">
          Design bar charts quickly with our free generator. Compare categories
          with customizable colors and labels. Perfect for reports,
          presentations, and websites.
        </p>
      </header>
      <div className="mt-8">
        <BarGraphGenerator />
      </div>
      <div className="mt-8">
        <BarGraphGeneratorSeo />
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
