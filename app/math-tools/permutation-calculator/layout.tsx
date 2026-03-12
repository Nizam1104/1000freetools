import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Permutation Calculator – Calculate nPr Online",
  description: "Calculate permutations (nPr) instantly with our free online permutation calculator. Find the number of ways r items can be arranged from n items with formula and solution shown.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/permutation-calculator",
  },
  openGraph: {
    title: "Permutation Calculator – Calculate nPr Online",
    description: "Calculate permutations (nPr) instantly with our free online permutation calculator. Find the number of ways r items can be arranged from n items with formula and solution shown.",
    type: "website",
    url: "https://1000freetools.com/calculators/permutation-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Permutation Calculator – Calculate nPr Online",
    description: "Calculate permutations (nPr) instantly with our free online permutation calculator. Find the number of ways r items can be arranged from n items with formula and solution shown.",
  },
};

const tools = [
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
    "name": "Random Number Generator – Generate Random Numbers Online",
    "description": "Generate random numbers within any range with our free online random number generator. Useful for games, statistics, lotteries, and any application requiring random values.",
    "href": "/math-tools/random-number-generator"
  },
  {
    "name": "Dice Roller Simulator – Roll Virtual Dice Online Free",
    "description": "Roll any type and number of dice virtually with our free online dice roller simulator. Supports d4, d6, d8, d10, d12, and d20 dice with instant results and totals.",
    "href": "/math-tools/dice-roller"
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
