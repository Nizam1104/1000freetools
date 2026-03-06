import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Perfect Number Checker – Is It a Perfect Number?",
  description: "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/perfect-number-checker",
  },
  openGraph: {
    title: "Perfect Number Checker – Is It a Perfect Number?",
    description: "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
    type: "website",
    url: "https://1000freetools.com/math-tools/perfect-number-checker",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Number Checker – Is It a Perfect Number?",
    description: "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
  },
};

const tools = [
  {
    "name": "Prime Number Checker – Is It Prime? Find Out Instantly",
    "description": "Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.",
    "href": "/math-tools/prime-number-checker"
  },
  {
    "name": "Armstrong Number Checker – Verify Narcissistic Numbers",
    "description": "Check if any number is an Armstrong or narcissistic number with our free online tool. Instantly verify whether the sum of each digit raised to the number of digits equals the original number.",
    "href": "/math-tools/armstrong-number-checker"
  },
  {
    "name": "Palindrome Number Checker – Is It a Palindrome?",
    "description": "Check if any number is a palindrome with our free online palindrome number checker. Instantly determine whether a number reads the same in both directions.",
    "href": "/math-tools/palindrome-number-checker"
  },
  {
    "name": "Digit Sum Calculator – Find Sum of Digits of Any Number",
    "description": "Calculate the sum of all digits in any number with our free online digit sum calculator. Also computes the digital root through repeated digit summation.",
    "href": "/math-tools/digit-sum-calculator"
  },
  {
    "name": "Euler's Totient Function Calculator – Compute φ(n) Online",
    "description": "Calculate Euler's totient function φ(n) for any integer with our free online calculator. Find the count of integers up to n that share no common factor with n.",
    "href": "/math-tools/eulers-totient-calculator"
  },
  {
    "name": "Factor Calculator – Find All Factors of Any Integer",
    "description": "Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.",
    "href": "/math-tools/factor-calculator"
  },
  {
    "name": "Divisibility Checker – Test Divisibility Rules Instantly",
    "description": "Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.",
    "href": "/math-tools/divisibility-checker"
  },
  {
    "name": "Prime Factorization Calculator – Find Prime Factors Instantly",
    "description": "Find the prime factorization of any number with our free online calculator. Displays all prime factors in exponential form and as a factor tree for easy understanding.",
    "href": "/math-tools/prime-factorization-calculator"
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
