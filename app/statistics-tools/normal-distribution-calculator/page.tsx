import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { NormalDistributionCalculator } from "@/components/statistics-tools/normal-distribution-calculator";
import NormalDistributionCalculatorSeo from "@/components/seo-content/statistics-tools/normal-distribution-calculator";

export const metadata: Metadata = {
  title: `Normal Distribution Calculator | Probability & Percentile`,
  description: `Calculate probabilities and percentiles for any normal distribution. Input mean and SD, find area under the curve, or get the value for a specific percentile.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/normal-distribution-calculator`,
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

export default function NormalDistributionCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Normal Distribution Calculator (Bell Curve)</h1>
        <p className="text-muted-foreground">Work with the normal distribution easily. Find probabilities, percentiles, and critical values for any mean and standard deviation, visualized on a classic bell curve.</p>
      </header>
      <div className="mt-8">
        <NormalDistributionCalculator />
      </div>
      <div className="mt-8">
        <NormalDistributionCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
