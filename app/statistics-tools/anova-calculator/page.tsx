import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AnovaCalculator from "@/components/statistics-tools/anova-calculator";
import AnovaCalculatorSeo from "@/components/seo-content/statistics-tools/anova-calculator";

export const metadata: Metadata = {
  title: `Free ANOVA Calculator | One-Way & Two-Way Analysis of Variance`,
  description: `Perform one-way or two-way ANOVA online. Calculate F-statistic, p-value, and get a complete summary table. Includes post-hoc tests like Tukey's HSD.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/anova-calculator`,
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
    name: `Correlation Coefficient Calculator (Pearson, Spearman)`,
    description: `Correlation Calculator (Pearson & Spearman)`,
    href: `/statistics-tools/correlation-calculator`,
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

export default function AnovaCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">ANOVA Calculator: One-Way and Two-Way</h1>
        <p className="text-muted-foreground">Compare means across multiple groups using Analysis of Variance. Our ANOVA calculator tests if group means are significantly different and includes post-hoc analysis to pinpoint where differences lie.</p>
      </header>
      <div className="mt-8">
        <AnovaCalculator />
      </div>
      <div className="mt-8">
        <AnovaCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
