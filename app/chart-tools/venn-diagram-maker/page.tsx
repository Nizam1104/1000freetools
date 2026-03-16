import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import VennDiagramMaker from "@/components/chart-tools/venn-diagram-maker";
import VennDiagramMakerSeo from "@/components/seo-content/chart-tools/venn-diagram-maker";

export const metadata: Metadata = {
  title: `Venn Diagram Maker | Create Venn Diagrams Free`,
  description: `Free online Venn diagram maker. Create diagrams with 2, 3, or 4 circles. Customize labels, colors, and overlaps. Download as PNG or SVG.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/venn-diagram-maker`,
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

export default function VennDiagramMakerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Venn Diagram Creator Online</h1>
        <p className="text-muted-foreground">
          Illustrate relationships and overlaps with a Venn diagram. Customize
          circles, labels, and colors to show logical sets and comparisons.
        </p>
      </header>
      <div className="mt-8">
        <VennDiagramMaker />
      </div>
      <div className="mt-8">
        <VennDiagramMakerSeo />
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
