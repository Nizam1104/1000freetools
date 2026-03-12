import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Divisibility Check 2–20 – Test Divisibility for All Numbers",
  description: "Check divisibility by all integers from 2 to 20 with a single input using our free online divisibility tool. Displays divisibility results with the rules used for each.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/divisibility-check-2-20",
  },
  openGraph: {
    title: "Divisibility Check 2–20 – Test Divisibility for All Numbers",
    description: "Check divisibility by all integers from 2 to 20 with a single input using our free online divisibility tool. Displays divisibility results with the rules used for each.",
    type: "website",
    url: "https://1000freetools.com/math-tools/divisibility-check-2-20",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divisibility Check 2–20 – Test Divisibility for All Numbers",
    description: "Check divisibility by all integers from 2 to 20 with a single input using our free online divisibility tool. Displays divisibility results with the rules used for each.",
  },
};

const tools = [
  {
    "name": "Divisibility Checker – Test Divisibility Rules Instantly",
    "description": "Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.",
    "href": "/math-tools/divisibility-checker"
  },
  {
    "name": "Modulo Calculator – Find the Remainder of Division",
    "description": "Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.",
    "href": "/math-tools/modulo-calculator"
  },
  {
    "name": "Factor Calculator – Find All Factors of Any Integer",
    "description": "Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.",
    "href": "/math-tools/factor-calculator"
  },
  {
    "name": "GCD / HCF Calculator – Find Greatest Common Divisor Online",
    "description": "Calculate the GCD or HCF of two or more numbers instantly with our free online calculator. Uses the Euclidean algorithm to find the greatest common divisor with step-by-step solutions.",
    "href": "/math-tools/gcd-hcf-calculator"
  },
  {
    "name": "Modular Arithmetic Calculator – Compute mod n Operations",
    "description": "Perform modular arithmetic operations including addition, subtraction, multiplication, and exponentiation under any modulus with our free online calculator.",
    "href": "/math-tools/modular-arithmetic-calculator"
  },
  {
    "name": "Digit Sum Calculator – Find Sum of Digits of Any Number",
    "description": "Calculate the sum of all digits in any number with our free online digit sum calculator. Also computes the digital root through repeated digit summation.",
    "href": "/math-tools/digit-sum-calculator"
  },
  {
    "name": "Reverse a Number – Reverse Digits of Any Number Online",
    "description": "Reverse the digits of any number instantly with our free online reverse number tool. Great for palindrome checking, number puzzles, and learning digit manipulation.",
    "href": "/math-tools/reverse-number"
  },
  {
    "name": "Prime Number Checker – Is It Prime? Find Out Instantly",
    "description": "Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.",
    "href": "/math-tools/prime-number-checker"
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
