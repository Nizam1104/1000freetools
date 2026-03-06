import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Sudoku Validator – Check if Your Sudoku Solution is Valid",
  description: "Validate any completed Sudoku puzzle grid with our free online Sudoku validator. Instantly check if all rows, columns, and 3x3 boxes satisfy Sudoku rules correctly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/sudoku-validator",
  },
  openGraph: {
    title: "Sudoku Validator – Check if Your Sudoku Solution is Valid",
    description: "Validate any completed Sudoku puzzle grid with our free online Sudoku validator. Instantly check if all rows, columns, and 3x3 boxes satisfy Sudoku rules correctly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/sudoku-validator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudoku Validator – Check if Your Sudoku Solution is Valid",
    description: "Validate any completed Sudoku puzzle grid with our free online Sudoku validator. Instantly check if all rows, columns, and 3x3 boxes satisfy Sudoku rules correctly.",
  },
};

const tools = [
  {
    "name": "Magic Square Generator – Create Magic Squares Online",
    "description": "Generate magic squares of any order with our free online magic square generator. Creates valid magic squares where all rows, columns, and diagonals have the same magical sum.",
    "href": "/math-tools/magic-square-generator"
  },
  {
    "name": "Palindrome Number Checker – Is It a Palindrome?",
    "description": "Check if any number is a palindrome with our free online palindrome number checker. Instantly determine whether a number reads the same in both directions.",
    "href": "/math-tools/palindrome-number-checker"
  },
  {
    "name": "Armstrong Number Checker – Verify Narcissistic Numbers",
    "description": "Check if any number is an Armstrong or narcissistic number with our free online tool. Instantly verify whether the sum of each digit raised to the number of digits equals the original number.",
    "href": "/math-tools/armstrong-number-checker"
  },
  {
    "name": "Digit Sum Calculator – Find Sum of Digits of Any Number",
    "description": "Calculate the sum of all digits in any number with our free online digit sum calculator. Also computes the digital root through repeated digit summation.",
    "href": "/math-tools/digit-sum-calculator"
  },
  {
    "name": "Perfect Number Checker – Is It a Perfect Number?",
    "description": "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
    "href": "/math-tools/perfect-number-checker"
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
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
