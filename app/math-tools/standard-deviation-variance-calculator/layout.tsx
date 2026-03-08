import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Standard Deviation Calculator – Variance & SD Online",
  description: "Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/standard-deviation-calculator",
  },
  openGraph: {
    title: "Standard Deviation Calculator – Variance & SD Online",
    description: "Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.",
    type: "website",
    url: "https://1000freetools.com/calculators/standard-deviation-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard Deviation Calculator – Variance & SD Online",
    description: "Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.",
  },
};

const tools = [
  {
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
  },
  {
    "name": "Z-Score Calculator – Find Standard Score Online",
    "description": "Calculate the Z-score of any data point with our free online Z-score calculator. Enter the value, mean, and standard deviation to get the standardized score instantly.",
    "href": "/math-tools/z-score-calculator"
  },
  {
    "name": "Normal Distribution Calculator – Find Probability & Percentile",
    "description": "Calculate probabilities and percentiles for a normal distribution with our free online calculator. Input mean and standard deviation to find area under the bell curve.",
    "href": "/math-tools/normal-distribution-calculator"
  },
  {
    "name": "Confidence Interval Calculator – Find CI for Mean Online",
    "description": "Calculate confidence intervals for population means with our free online confidence interval calculator. Supports 90%, 95%, and 99% confidence levels with margin of error shown.",
    "href": "/math-tools/confidence-interval-calculator"
  },
  {
    "name": "Five Number Summary Calculator – Min Q1 Median Q3 Max",
    "description": "Find the five-number summary of any dataset with our free online calculator. Instantly compute the minimum, Q1, median, Q3, and maximum for complete data analysis.",
    "href": "/math-tools/five-number-summary-calculator"
  },
  {
    "name": "Outlier Detector – Find Outliers Using IQR Method Online",
    "description": "Detect outliers in any dataset using the IQR method with our free online outlier detector. Find lower and upper fences and identify all outlying values in your data.",
    "href": "/math-tools/outlier-detector"
  },
  {
    "name": "Correlation Coefficient Calculator – Find Pearson r Online",
    "description": "Calculate the Pearson correlation coefficient between two variables with our free online calculator. Measure the strength and direction of linear relationships in your data.",
    "href": "/math-tools/correlation-coefficient-calculator"
  },
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
