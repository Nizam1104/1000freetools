import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinomialDistributionCalculator from "@/components/statistics-tools/binomial-distribution-calculator";
import BinomialDistributionCalculatorSeo from "@/components/seo-content/statistics-tools/binomial-distribution-calculator";

export const metadata: Metadata = {
  title: `Binomial Distribution Calculator | Find Probability of Success`,
  description: `Calculate binomial probabilities (exact, cumulative, more than). Input trials, probability, and successes. See the distribution graph and results instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/binomial-distribution-calculator`,
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

export default function BinomialDistributionCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Binomial Probability Distribution Calculator</h1>
        <p className="text-muted-foreground">Calculate exact and cumulative probabilities for binomial experiments. Find the chance of getting a specific number of successes in a fixed number of independent trials.</p>
      </header>
      <div className="mt-8">
        <BinomialDistributionCalculator />
      </div>
      <div className="mt-8">
        <BinomialDistributionCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
