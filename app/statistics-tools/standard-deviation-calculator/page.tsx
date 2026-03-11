import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import StandardDeviationCalculator from "@/components/statistics-tools/standard-deviation-calculator";
import StandardDeviationCalculatorSeo from "@/components/seo-content/statistics-tools/standard-deviation-calculator";

export const metadata: Metadata = {
  title: `Free Standard Deviation Calculator | Find Variance & Mean`,
  description: `Instantly calculate sample or population standard deviation and variance. Upload data, see step-by-step work, and visualize distribution. Free, no sign-up required.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/standard-deviation-calculator`,
  },
};

const tools = [
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

export default function StandardDeviationCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Standard Deviation Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate standard deviation and variance for any dataset instantly.
          Our free tool handles both sample and population formulas, providing
          clear results and visualizations to help you understand your data's
          spread.
        </p>
      </header>
      <div className="mt-8">
        <StandardDeviationCalculator />
      </div>
      <div className="mt-8">
        <StandardDeviationCalculatorSeo />
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
