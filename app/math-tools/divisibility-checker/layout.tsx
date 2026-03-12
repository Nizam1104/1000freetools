import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Divisibility Checker – Test Divisibility Rules Instantly",
  description: "Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/divisibility-checker",
  },
  openGraph: {
    title: "Divisibility Checker – Test Divisibility Rules Instantly",
    description: "Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.",
    type: "website",
    url: "https://1000freetools.com/math-tools/divisibility-checker",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divisibility Checker – Test Divisibility Rules Instantly",
    description: "Check if any number is divisible by another with our free online divisibility checker. Displays the relevant divisibility rule and provides instant yes or no results.",
  },
};

const tools = [
  {
    "name": "Divisibility Check 2–20 – Test Divisibility for All Numbers",
    "description": "Check divisibility by all integers from 2 to 20 with a single input using our free online divisibility tool. Displays divisibility results with the rules used for each.",
    "href": "/math-tools/divisibility-check-2-20"
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
    "name": "Modulo Calculator – Find the Remainder of Division",
    "description": "Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.",
    "href": "/math-tools/modulo-calculator"
  },
  {
    "name": "Prime Number Checker – Is It Prime? Find Out Instantly",
    "description": "Check if any number is prime or composite instantly with our free online prime number checker. Fast, accurate prime testing for any positive integer with a clear explanation.",
    "href": "/math-tools/prime-number-checker"
  },
  {
    "name": "Prime Factorization Calculator – Find Prime Factors Instantly",
    "description": "Find the prime factorization of any number with our free online calculator. Displays all prime factors in exponential form and as a factor tree for easy understanding.",
    "href": "/math-tools/prime-factorization-calculator"
  },
  {
    "name": "Factors List Generator – Find All Factors of a Number",
    "description": "Generate a complete sorted list of all factors of any number instantly with our free online factors calculator. Ideal for math homework, LCM/GCD problems, and number theory.",
    "href": "/math-tools/factors-list-generator"
  },
  {
    "name": "Modular Arithmetic Calculator – Compute mod n Operations",
    "description": "Perform modular arithmetic operations including addition, subtraction, multiplication, and exponentiation under any modulus with our free online calculator.",
    "href": "/math-tools/modular-arithmetic-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/divisibility-checker">Divisibility Checker</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
