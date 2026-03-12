import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Long Multiplication Calculator – Step-by-Step Multiplication",
  description: "Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/long-multiplication-calculator",
  },
  openGraph: {
    title: "Long Multiplication Calculator – Step-by-Step Multiplication",
    description: "Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.",
    type: "website",
    url: "https://1000freetools.com/math-tools/long-multiplication-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long Multiplication Calculator – Step-by-Step Multiplication",
    description: "Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.",
  },
};

const tools = [
  {
    "name": "Long Division Calculator – Step-by-Step Division with Remainder",
    "description": "Solve long division problems step by step with our free online long division calculator. See every step of the division process including quotient and remainder – ideal for learning.",
    "href": "/math-tools/long-division-calculator"
  },
  {
    "name": "BODMAS / PEMDAS Calculator – Order of Operations Solver",
    "description": "Solve any math expression using the correct order of operations with our free BODMAS/PEMDAS calculator. Get step-by-step breakdowns to understand exactly how each expression is evaluated.",
    "href": "/math-tools/order-of-operations-solver"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Matrix Multiplication Calculator – Multiply Matrices Online",
    "description": "Multiply any two compatible matrices with our free online matrix multiplication calculator. See the full product matrix with step-by-step row-by-column computation.",
    "href": "/math-tools/matrix-multiplication-calculator"
  },
  {
    "name": "Multiplication Table Generator – Create Times Tables Online",
    "description": "Generate complete multiplication tables for any number with our free online generator. Create and print times tables from 1 to any limit – great for students learning multiplication.",
    "href": "/math-tools/multiplication-table"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Big Number Calculator – Compute Huge Numbers Online",
    "description": "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
    "href": "/math-tools/big-number-calculator"
  },
  {
    "name": "Modulo Calculator – Find the Remainder of Division",
    "description": "Calculate the modulo or remainder of any division instantly with our free online modulo calculator. Essential for programming, number theory, and cryptography applications.",
    "href": "/math-tools/modulo-calculator"
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
