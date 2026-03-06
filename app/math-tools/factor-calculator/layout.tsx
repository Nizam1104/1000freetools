import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Factor Calculator – Find All Factors of Any Integer",
  description: "Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/factor-calculator",
  },
  openGraph: {
    title: "Factor Calculator – Find All Factors of Any Integer",
    description: "Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.",
    type: "website",
    url: "https://1000freetools.com/math-tools/factor-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Factor Calculator – Find All Factors of Any Integer",
    description: "Find all factors of any integer instantly with our free online factor calculator. Lists every factor in ascending order – perfect for simplifying fractions and solving number theory problems.",
  },
};

const tools = [
  {
    "name": "Prime Factorization Calculator – Find Prime Factors Instantly",
    "description": "Find the prime factorization of any number with our free online calculator. Displays all prime factors in exponential form and as a factor tree for easy understanding.",
    "href": "/math-tools/prime-factorization-calculator"
  },
  {
    "name": "GCD / HCF Calculator – Find Greatest Common Divisor Online",
    "description": "Calculate the GCD or HCF of two or more numbers instantly with our free online calculator. Uses the Euclidean algorithm to find the greatest common divisor with step-by-step solutions.",
    "href": "/math-tools/gcd-hcf-calculator"
  },
  {
    "name": "LCM Calculator – Find Least Common Multiple Online",
    "description": "Calculate the Least Common Multiple (LCM) of two or more numbers instantly with our free online LCM calculator. Get accurate results with step-by-step explanations.",
    "href": "/math-tools/lcm-calculator"
  },
  {
    "name": "Factors List Generator – Find All Factors of a Number",
    "description": "Generate a complete sorted list of all factors of any number instantly with our free online factors calculator. Ideal for math homework, LCM/GCD problems, and number theory.",
    "href": "/math-tools/factors-list-generator"
  },
  {
    "name": "Prime Number Checker – Is It Prime? Find Out Instantly",
    "description": "Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.",
    "href": "/math-tools/prime-number-checker"
  },
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
    "name": "Simplify Expression Calculator – Simplify Algebraic Expressions",
    "description": "Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.",
    "href": "/math-tools/simplify-expression"
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
