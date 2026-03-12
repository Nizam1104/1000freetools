import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
  description: "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/fibonacci-generator",
  },
  openGraph: {
    title: "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    description: "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    type: "website",
    url: "https://1000freetools.com/calculators/fibonacci-generator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    description: "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
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
    "name": "nth Term Finder – Find Any Term of a Sequence Online",
    "description": "Find the nth term of any arithmetic or geometric sequence with our free online nth term finder. Enter sequence parameters to calculate any specific term instantly.",
    "href": "/math-tools/nth-term-finder"
  },
  {
    "name": "Pascal's Triangle Generator – Generate Pascal's Triangle Online",
    "description": "Generate Pascal's Triangle up to any number of rows with our free online generator. Visualize binomial coefficients, patterns, and number relationships in a clear triangle format.",
    "href": "/math-tools/pascals-triangle-generator"
  },
  {
    "name": "Binomial Expansion Calculator – Expand (a+b)^n Online",
    "description": "Expand any binomial expression (a + b)^n with our free online binomial expansion calculator. Uses the binomial theorem with Pascal's triangle coefficients and full term listing.",
    "href": "/math-tools/binomial-expansion-calculator"
  },
  {
    "name": "Geometric Series Sum Calculator – Find Sum of GP Online",
    "description": "Calculate the sum of finite and infinite geometric series with our free online calculator. Supports both converging and diverging series with the geometric sum formula shown.",
    "href": "/math-tools/geometric-series-calculator"
  },
  {
    "name": "Harmonic Series Calculator – Compute Partial Sums Online",
    "description": "Calculate the partial sum of the harmonic series up to any number of terms with our free online harmonic series calculator. Explore the divergent nature of this classic series.",
    "href": "/math-tools/harmonic-series-calculator"
  },
  {
    "name": "Pi Digit Generator – View Digits of π to Any Decimal Place",
    "description": "View the digits of Pi (π) to any decimal place with our free online Pi digit generator. Explore and study the infinite decimal expansion of this famous mathematical constant.",
    "href": "/math-tools/pi-digit-generator"
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
