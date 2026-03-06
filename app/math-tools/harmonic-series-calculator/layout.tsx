import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Harmonic Series Calculator – Compute Partial Sums Online",
  description: "Calculate the partial sum of the harmonic series up to any number of terms with our free online harmonic series calculator. Explore the divergent nature of this classic series.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/harmonic-series-calculator",
  },
  openGraph: {
    title: "Harmonic Series Calculator – Compute Partial Sums Online",
    description: "Calculate the partial sum of the harmonic series up to any number of terms with our free online harmonic series calculator. Explore the divergent nature of this classic series.",
    type: "website",
    url: "https://1000freetools.com/math-tools/harmonic-series-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonic Series Calculator – Compute Partial Sums Online",
    description: "Calculate the partial sum of the harmonic series up to any number of terms with our free online harmonic series calculator. Explore the divergent nature of this classic series.",
  },
};

const tools = [
  {
    "name": "Arithmetic Sequence Calculator – Find Terms & Sum Online",
    "description": "Calculate any term, common difference, or partial sum of an arithmetic sequence with our free online calculator. Enter known values to solve arithmetic progressions instantly.",
    "href": "/math-tools/arithmetic-sequence-calculator"
  },
  {
    "name": "Geometric Sequence Calculator – Find Terms & Sum Online",
    "description": "Calculate any term, common ratio, or sum of a geometric sequence with our free online calculator. Solve geometric progressions for any number of terms with full solutions.",
    "href": "/math-tools/geometric-sequence-calculator"
  },
  {
    "name": "Arithmetic Series Sum Calculator – Find Sum of AP Online",
    "description": "Calculate the sum of any arithmetic series with our free online calculator. Enter the first term, common difference, and number of terms to find the series sum instantly.",
    "href": "/math-tools/arithmetic-series-calculator"
  },
  {
    "name": "Geometric Series Sum Calculator – Find Sum of GP Online",
    "description": "Calculate the sum of finite and infinite geometric series with our free online calculator. Supports both converging and diverging series with the geometric sum formula shown.",
    "href": "/math-tools/geometric-series-calculator"
  },
  {
    "name": "nth Term Finder – Find Any Term of a Sequence Online",
    "description": "Find the nth term of any arithmetic or geometric sequence with our free online nth term finder. Enter sequence parameters to calculate any specific term instantly.",
    "href": "/math-tools/nth-term-finder"
  },
  {
    "name": "Harmonic Mean Calculator – Find Harmonic Average Online",
    "description": "Calculate the harmonic mean of any dataset with our free online harmonic mean calculator. Ideal for rates and ratios where harmonic averaging is more appropriate.",
    "href": "/math-tools/harmonic-mean-calculator"
  },
  {
    "name": "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    "description": "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    "href": "/math-tools/fibonacci-generator"
  },
  {
    "name": "Limit Calculator – Evaluate Limits of Functions Online",
    "description": "Calculate limits of any function as x approaches a value or infinity with our free online limit calculator. Evaluates one-sided and two-sided limits with clear results.",
    "href": "/math-tools/limit-calculator"
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
