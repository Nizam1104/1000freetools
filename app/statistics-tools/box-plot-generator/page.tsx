import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { BoxPlotGenerator } from "@/components/statistics-tools/box-plot-generator";
import BoxPlotGeneratorSeo from "@/components/seo-content/statistics-tools/box-plot-generator";

export const metadata: Metadata = {
  title: `Free Box Plot Generator | Create Box-and-Whisker Plots`,
  description: `Generate box plots online. Visualize five-number summary, outliers, and compare distributions across groups. Customize and download your plot.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/box-plot-generator`,
  },
};

const tools = [
  {
    name: `Standard Deviation Calculator`,
    description: `Standard Deviation Calculator`,
    href: `/statistics-tools/standard-deviation-calculator`,
  },
  {
    name: `Z-Score Calculator`,
    description: `Z-Score Calculator (Standard Score)`,
    href: `/statistics-tools/z-score-calculator`,
  },
  {
    name: `T-Test Calculator (One Sample, Two Sample, Paired)`,
    description: `T-Test Calculator: One, Two, & Paired Samples`,
    href: `/statistics-tools/t-test-calculator`,
  },
  {
    name: `Chi-Square Test Calculator (Goodness of Fit & Independence)`,
    description: `Chi-Square Test Calculator`,
    href: `/statistics-tools/chi-square-test-calculator`,
  },
  {
    name: `ANOVA Calculator (One-Way & Two-Way)`,
    description: `ANOVA Calculator: One-Way and Two-Way`,
    href: `/statistics-tools/anova-calculator`,
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
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function BoxPlotGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Box Plot Generator (Box-and-Whisker)</h1>
        <p className="text-muted-foreground">Create box plots to visualize the distribution and outliers in your data. Compare multiple groups side-by-side with a clear, statistical summary.</p>
      </header>
      <div className="mt-8">
        <BoxPlotGenerator />
      </div>
      <div className="mt-8">
        <BoxPlotGeneratorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
