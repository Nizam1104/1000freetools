import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ZScoreCalculator from "@/components/statistics-tools/z-score-calculator";
import ZScoreCalculatorSeo from "@/components/seo-content/statistics-tools/z-score-calculator";

export const metadata: Metadata = {
  title: `Z-Score Calculator | Find Standard Score & Probability`,
  description: `Calculate z-scores and p-values instantly. Understand where a value falls in a normal distribution. Free tool for students and researchers.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/z-score-calculator`,
  },
};

const tools = [
  {
    name: `Standard Deviation Calculator`,
    description: `Standard Deviation Calculator`,
    href: `/statistics-tools/standard-deviation-calculator`,
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

export default function ZScoreCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Z-Score Calculator (Standard Score)
        </h1>
        <p className="text-muted-foreground">
          Convert any data point to a z-score to see how many standard
          deviations it is from the mean. Use our calculator to find
          probabilities and percentiles in a normal distribution quickly.
        </p>
      </header>
      <div className="mt-8">
        <ZScoreCalculator />
      </div>
      <div className="mt-8">
        <ZScoreCalculatorSeo />
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
