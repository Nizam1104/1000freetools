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
  title: "Free Online Standard Calculator – Fast & Easy Math",
  description: "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/standard-calculator",
  },
  openGraph: {
    title: "Free Online Standard Calculator – Fast & Easy Math",
    description: "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    type: "website",
    url: "https://1000freetools.com/math-tools/standard-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Standard Calculator – Fast & Easy Math",
    description: "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
  },
};

const tools = [
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    "description": "Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.",
    "href": "/math-tools/fraction-calculator"
  },
  {
    "name": "Percentage Calculator – Find % of Any Number Instantly",
    "description": "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    "href": "/math-tools/percentage-calculator"
  },
  {
    "name": "Square Root Calculator – Compute √ of Any Number",
    "description": "Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results.",
    "href": "/math-tools/square-root-calculator"
  },
  {
    "name": "Exponent Calculator – Calculate Base to the Power of n",
    "description": "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
    "href": "/math-tools/exponent-calculator"
  },
  {
    "name": "Modulo Calculator – Find the Remainder of Division",
    "description": "Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.",
    "href": "/math-tools/modulo-calculator"
  },
  {
    "name": "Long Division Calculator – Step-by-Step Division with Remainder",
    "description": "Solve long division problems step by step with our free online long division calculator. See every step of the division process including quotient and remainder – ideal for learning.",
    "href": "/math-tools/long-division-calculator"
  },
  {
    "name": "Long Multiplication Calculator – Step-by-Step Multiplication",
    "description": "Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.",
    "href": "/math-tools/long-multiplication-calculator"
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
              <BreadcrumbLink href="/math-tools/standard-calculator">Standard Calculator</BreadcrumbLink>
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
