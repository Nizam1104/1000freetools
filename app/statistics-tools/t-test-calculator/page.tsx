import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TTestCalculator from "@/components/statistics-tools/t-test-calculator";
import TTestCalculatorSeo from "@/components/seo-content/statistics-tools/t-test-calculator";

export const metadata: Metadata = {
  title: `Free T-Test Calculator | One, Two & Paired Samples`,
  description: `Run one-sample, two-sample, and paired t-tests online. Get t-statistic, p-value, and confidence interval. Perfect for hypothesis testing in statistics.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/t-test-calculator`,
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

export default function TTestCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">T-Test Calculator: One, Two, & Paired Samples</h1>
        <p className="text-muted-foreground">Perform statistical t-tests to compare means. Our tool handles one-sample, two independent samples, and paired data tests, giving you p-values and confidence intervals to support your conclusions.</p>
      </header>
      <div className="mt-8">
        <TTestCalculator />
      </div>
      <div className="mt-8">
        <TTestCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
