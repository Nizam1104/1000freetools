import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Z-Score Calculator – Find Standard Score Online",
  description: "Calculate the Z-score of any data point with our free online Z-score calculator. Enter the value, mean, and standard deviation to get the standardized score instantly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/z-score-calculator",
  },
  openGraph: {
    title: "Z-Score Calculator – Find Standard Score Online",
    description: "Calculate the Z-score of any data point with our free online Z-score calculator. Enter the value, mean, and standard deviation to get the standardized score instantly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/z-score-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z-Score Calculator – Find Standard Score Online",
    description: "Calculate the Z-score of any data point with our free online Z-score calculator. Enter the value, mean, and standard deviation to get the standardized score instantly.",
  },
};

const tools = [
  {
    "name": "Normal Distribution Calculator – Find Probability & Percentile",
    "description": "Calculate probabilities and percentiles for a normal distribution with our free online calculator. Input mean and standard deviation to find area under the bell curve.",
    "href": "/math-tools/normal-distribution-calculator"
  },
  {
    "name": "Standard Deviation Calculator – Variance & SD Online",
    "description": "Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.",
    "href": "/math-tools/standard-deviation-variance-calculator"
  },
  {
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
  },
  {
    "name": "Confidence Interval Calculator – Find CI for Mean Online",
    "description": "Calculate confidence intervals for population means with our free online confidence interval calculator. Supports 90%, 95%, and 99% confidence levels with margin of error shown.",
    "href": "/math-tools/confidence-interval-calculator"
  },
  {
    "name": "Correlation Coefficient Calculator – Find Pearson r Online",
    "description": "Calculate the Pearson correlation coefficient between two variables with our free online calculator. Measure the strength and direction of linear relationships in your data.",
    "href": "/math-tools/correlation-coefficient-calculator"
  },
  {
    "name": "Linear Regression Calculator – Find Best Fit Line Online",
    "description": "Perform linear regression analysis on any dataset with our free online linear regression calculator. Get the regression equation, slope, intercept, and R² value with a scatter plot.",
    "href": "/math-tools/linear-regression-calculator"
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
