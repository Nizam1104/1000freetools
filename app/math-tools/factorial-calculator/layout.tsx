import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Factorial Calculator – Compute n! Instantly Online",
  description: "Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/factorial-calculator",
  },
  openGraph: {
    title: "Factorial Calculator – Compute n! Instantly Online",
    description: "Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.",
    type: "website",
    url: "https://1000freetools.com/math-tools/factorial-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Factorial Calculator – Compute n! Instantly Online",
    description: "Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.",
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
    "name": "Probability Calculator – Calculate Probability of Events Online",
    "description": "Calculate the probability of any event with our free online probability calculator. Find simple, complementary, and conditional probabilities with formula explanations.",
    "href": "/math-tools/probability-calculator"
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
    "name": "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    "description": "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    "href": "/math-tools/fibonacci-generator"
  },
  {
    "name": "Big Number Calculator – Compute Huge Numbers Online",
    "description": "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
    "href": "/math-tools/big-number-calculator"
  },
  {
    "name": "Random Number Generator – Generate Random Numbers Online",
    "description": "Generate random numbers within any range with our free online random number generator. Useful for games, statistics, lotteries, and any application requiring random values.",
    "href": "/math-tools/random-number-generator"
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
