import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Reverse a Number – Reverse Digits of Any Number Online",
  description: "Reverse the digits of any number instantly with our free online reverse number tool. Great for palindrome checking, number puzzles, and learning digit manipulation.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/reverse-number",
  },
  openGraph: {
    title: "Reverse a Number – Reverse Digits of Any Number Online",
    description: "Reverse the digits of any number instantly with our free online reverse number tool. Great for palindrome checking, number puzzles, and learning digit manipulation.",
    type: "website",
    url: "https://1000freetools.com/math-tools/reverse-number",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse a Number – Reverse Digits of Any Number Online",
    description: "Reverse the digits of any number instantly with our free online reverse number tool. Great for palindrome checking, number puzzles, and learning digit manipulation.",
  },
};

const tools = [
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
    "name": "Divisibility Check 2–20 – Test Divisibility for All Numbers",
    "description": "Check divisibility by all integers from 2 to 20 with a single input using our free online divisibility tool. Displays divisibility results with the rules used for each.",
    "href": "/math-tools/divisibility-check-2-20"
  },
  {
    "name": "Armstrong Number Checker – Verify Narcissistic Numbers",
    "description": "Check if any number is an Armstrong or narcissistic number with our free online tool. Instantly verify whether the sum of each digit raised to the number of digits equals the original number.",
    "href": "/math-tools/armstrong-number-checker"
  },
  {
    "name": "Perfect Number Checker – Is It a Perfect Number?",
    "description": "Check if any number is a perfect number with our free online perfect number checker. Instantly determine if the sum of proper divisors equals the number itself.",
    "href": "/math-tools/perfect-number-checker"
  },
  {
    "name": "Number to Words Converter – Convert Numbers to English Words",
    "description": "Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.",
    "href": "/math-tools/number-word-converter"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Prime Number Checker – Is It Prime? Find Out Instantly",
    "description": "Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.",
    "href": "/math-tools/prime-number-checker"
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
