import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Number Sorter – Sort Numbers Ascending or Descending Online",
  description: "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/number-sorter",
  },
  openGraph: {
    title: "Number Sorter – Sort Numbers Ascending or Descending Online",
    description: "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
    type: "website",
    url: "https://1000freetools.com/math-tools/number-sorter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Sorter – Sort Numbers Ascending or Descending Online",
    description: "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
  },
};

const tools = [
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
  },
  {
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
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
    "name": "Frequency Distribution Table Generator – Organize Data Online",
    "description": "Create a complete frequency distribution table from any dataset with our free online tool. Includes frequency, relative frequency, and cumulative frequency for easy data analysis.",
    "href": "/math-tools/frequency-distribution-table"
  },
  {
    "name": "Factors List Generator – Find All Factors of a Number",
    "description": "Generate a complete sorted list of all factors of any number instantly with our free online factors calculator. Ideal for math homework, LCM/GCD problems, and number theory.",
    "href": "/math-tools/factors-list-generator"
  },
  {
    "name": "Number Sorter – Sort Numbers Ascending or Descending Online",
    "description": "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
    "href": "/math-tools/number-sorter"
  },
  {
    "name": "Number Line Visualizer – Plot Numbers on a Number Line",
    "description": "Visualize numbers, fractions, and inequalities on an interactive number line with our free online number line tool. Plot points and ranges to better understand number concepts.",
    "href": "/math-tools/number-line-visualizer"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
