import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PValueCalculator from "@/components/statistics-tools/p-value-calculator";
import PValueCalculatorSeo from "@/components/seo-content/statistics-tools/p-value-calculator";

export const metadata: Metadata = {
  title: `P-Value Calculator | For Z, T, Chi-Square, and F Tests`,
  description: `Calculate p-values from test statistics for z, t, chi-square, and F distributions. Input your value and degrees of freedom for instant results.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/p-value-calculator`,
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

export default function PValueCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">P-Value Calculator (Z, T, Chi-Square, F)</h1>
        <p className="text-muted-foreground">Find the p-value for your hypothesis test quickly. Enter your test statistic from a z, t, chi-square, or F test to get the corresponding significance level.</p>
      </header>
      <div className="mt-8">
        <PValueCalculator />
      </div>
      <div className="mt-8">
        <PValueCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
