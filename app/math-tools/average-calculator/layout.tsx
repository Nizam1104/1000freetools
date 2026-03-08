import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Average Calculator – Find the Mean of Any Numbers",
  description: "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/average-calculator",
  },
  openGraph: {
    title: "Average Calculator – Find the Mean of Any Numbers",
    description: "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    type: "website",
    url: "https://1000freetools.com/calculators/average-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Calculator – Find the Mean of Any Numbers",
    description: "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
  },
};

const tools = [
  {
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
  },
  {
    "name": "Weighted Average Calculator – Compute Weighted Mean Online",
    "description": "Calculate the weighted average or weighted mean of any set of values with our free online calculator. Enter values and weights to get the accurate weighted result instantly.",
    "href": "/math-tools/weighted-average-calculator"
  },
  {
    "name": "Geometric Mean Calculator – Find Geometric Average Online",
    "description": "Calculate the geometric mean of any set of numbers with our free online calculator. Ideal for finance, biology, and statistics where multiplicative relationships matter.",
    "href": "/math-tools/geometric-mean-calculator"
  },
  {
    "name": "Harmonic Mean Calculator – Find Harmonic Average Online",
    "description": "Calculate the harmonic mean of any dataset with our free online harmonic mean calculator. Ideal for rates and ratios where harmonic averaging is more appropriate.",
    "href": "/math-tools/harmonic-mean-calculator"
  },
  {
    "name": "Standard Deviation Calculator – Variance & SD Online",
    "description": "Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.",
    "href": "/math-tools/standard-deviation-variance-calculator"
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
    "name": "Number Sorter – Sort Numbers Ascending or Descending Online",
    "description": "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
    "href": "/math-tools/number-sorter"
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
