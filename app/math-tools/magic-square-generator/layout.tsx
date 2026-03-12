import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Magic Square Generator – Create Magic Squares Online",
  description: "Generate magic squares of any order with our free online magic square generator. Creates valid magic squares where all rows, columns, and diagonals have the same magical sum.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/magic-square-generator",
  },
  openGraph: {
    title: "Magic Square Generator – Create Magic Squares Online",
    description: "Generate magic squares of any order with our free online magic square generator. Creates valid magic squares where all rows, columns, and diagonals have the same magical sum.",
    type: "website",
    url: "https://1000freetools.com/math-tools/magic-square-generator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Square Generator – Create Magic Squares Online",
    description: "Generate magic squares of any order with our free online magic square generator. Creates valid magic squares where all rows, columns, and diagonals have the same magical sum.",
  },
};

const tools = [
  {
    "name": "Sudoku Validator – Check if Your Sudoku Solution is Valid",
    "description": "Validate any completed Sudoku puzzle grid with our free online Sudoku validator. Instantly check if all rows, columns, and 3x3 boxes satisfy Sudoku rules correctly.",
    "href": "/math-tools/sudoku-validator"
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
  },
  {
    "name": "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    "description": "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    "href": "/math-tools/fibonacci-generator"
  },
  {
    "name": "Pi Digit Generator – View Digits of π to Any Decimal Place",
    "description": "View the digits of Pi (π) to any decimal place with our free online Pi digit generator. Explore and study the infinite decimal expansion of this famous mathematical constant.",
    "href": "/math-tools/pi-digit-generator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Pascal's Triangle Generator – Generate Pascal's Triangle Online",
    "description": "Generate Pascal's Triangle up to any number of rows with our free online generator. Visualize binomial coefficients, patterns, and number relationships in a clear triangle format.",
    "href": "/math-tools/pascals-triangle-generator"
  },
  {
    "name": "Perfect Number Checker – Is It a Perfect Number?",
    "description": "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
    "href": "/math-tools/perfect-number-checker"
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
