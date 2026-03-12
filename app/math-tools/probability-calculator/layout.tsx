import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Probability Calculator – Calculate Probability of Events Online",
  description: "Calculate the probability of any event with our free online probability calculator. Find simple, complementary, and conditional probabilities with formula explanations.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/probability-calculator",
  },
  openGraph: {
    title: "Probability Calculator – Calculate Probability of Events Online",
    description: "Calculate the probability of any event with our free online probability calculator. Find simple, complementary, and conditional probabilities with formula explanations.",
    type: "website",
    url: "https://1000freetools.com/math-tools/probability-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Probability Calculator – Calculate Probability of Events Online",
    description: "Calculate the probability of any event with our free online probability calculator. Find simple, complementary, and conditional probabilities with formula explanations.",
  },
};

const tools = [
  {
    "name": "Permutation Calculator – Calculate nPr Online",
    "description": "Calculate permutations (nPr) instantly with our free online permutation calculator. Find the number of ways r items can be arranged from n items with formula and solution shown.",
    "href": "/math-tools/permutation-calculator"
  },
  {
    "name": "Combination Calculator – Calculate nCr Online",
    "description": "Calculate combinations (nCr) instantly with our free online combination calculator. Find how many ways r items can be chosen from n items using the combination formula.",
    "href": "/math-tools/combination-calculator"
  },
  {
    "name": "Factorial Calculator – Compute n! Instantly Online",
    "description": "Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.",
    "href": "/math-tools/factorial-calculator"
  },
  {
    "name": "Normal Distribution Calculator – Find Probability & Percentile",
    "description": "Calculate probabilities and percentiles for a normal distribution with our free online calculator. Input mean and standard deviation to find area under the bell curve.",
    "href": "/math-tools/normal-distribution-calculator"
  },
  {
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
  },
  {
    "name": "Standard Deviation Calculator – Variance & SD Online",
    "description": "Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.",
    "href": "/math-tools/standard-deviation-variance-calculator"
  },
  {
    "name": "Frequency Distribution Table Generator – Organize Data Online",
    "description": "Create a complete frequency distribution table from any dataset with our free online tool. Includes frequency, relative frequency, and cumulative frequency for easy data analysis.",
    "href": "/math-tools/frequency-distribution-table"
  },
  {
    "name": "Five Number Summary Calculator – Min Q1 Median Q3 Max",
    "description": "Find the five-number summary of any dataset with our free online calculator. Instantly compute the minimum, Q1, median, Q3, and maximum for complete data analysis.",
    "href": "/math-tools/five-number-summary-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/probability-calculator">Probability Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
