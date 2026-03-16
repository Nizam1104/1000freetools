import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Chi-Square Calculator | Goodness of Fit & Independence Test`,
  description: `Free Chi-Square test calculator for goodness of fit and contingency tables. Calculate chi-square statistic, p-value, and interpret results for categorical data analysis.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/chi-square-test-calculator`,
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
    name: `ANOVA Calculator (One-Way & Two-Way)`,
    description: `ANOVA Calculator: One-Way and Two-Way`,
    href: `/statistics-tools/anova-calculator`,
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

export default function ChiSquareTestCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Chi-Square Test Calculator</h1>
        <p className="text-muted-foreground">Analyze categorical data with Chi-Square tests for goodness of fit or independence. Enter your observed frequencies into our calculator to get the chi-square statistic and determine statistical significance.</p>
      </header>
      {/* TODO: add tool component for chi-square-test-calculator */}
      {/* TODO: add seo component for chi-square-test-calculator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
