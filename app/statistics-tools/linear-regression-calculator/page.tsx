import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import LinearRegressionCalculator from "@/components/statistics-tools/linear-regression-calculator";
import LinearRegressionCalculatorSeo from "@/components/seo-content/statistics-tools/linear-regression-calculator";

export const metadata: Metadata = {
  title: `Free Linear Regression Calculator | Find Slope & Intercept`,
  description: `Perform simple linear regression analysis online. Get regression equation, R-squared, and make predictions. Visualize the best-fit line on a scatter plot.`,
  alternates: {
    canonical: `https://1000freetools.com/statistics-tools/linear-regression-calculator`,
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

export default function LinearRegressionCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Linear Regression Calculator</h1>
        <p className="text-muted-foreground">Find the best-fitting straight line for your data. Our linear regression tool calculates the equation, R-squared value, and lets you make predictions based on the model.</p>
      </header>
      <div className="mt-8">
        <LinearRegressionCalculator />
      </div>
      <div className="mt-8">
        <LinearRegressionCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
