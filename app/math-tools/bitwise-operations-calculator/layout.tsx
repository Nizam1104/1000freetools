import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts",
  description: "Perform bitwise AND, OR, XOR, NOT, left shift, and right shift operations on integers with our free online bitwise calculator. See binary representations alongside results.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/bitwise-operations-calculator",
  },
  openGraph: {
    title: "Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts",
    description: "Perform bitwise AND, OR, XOR, NOT, left shift, and right shift operations on integers with our free online bitwise calculator. See binary representations alongside results.",
    type: "website",
    url: "https://1000freetools.com/math-tools/bitwise-operations-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts",
    description: "Perform bitwise AND, OR, XOR, NOT, left shift, and right shift operations on integers with our free online bitwise calculator. See binary representations alongside results.",
  },
};

const tools = [
  {
    "name": "Binary Addition & Subtraction Calculator – Compute in Base 2",
    "description": "Add and subtract binary numbers step by step with our free online binary calculator. See each bit-by-bit operation clearly – perfect for computer science and digital electronics.",
    "href": "/math-tools/binary-arithmetic-calculator"
  },
  {
    "name": "Two's Complement Calculator – Convert to Twos Complement",
    "description": "Convert any integer to its two's complement binary form or decode two's complement back to decimal with our free online calculator. Supports various bit widths.",
    "href": "/math-tools/twos-complement-calculator"
  },
  {
    "name": "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    "description": "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
    "href": "/math-tools/number-base-converter"
  },
  {
    "name": "Truth Table Generator – Create Logic Truth Tables Online",
    "description": "Generate truth tables for any logical expression with our free online truth table generator. Supports AND, OR, NOT, XOR, NAND, NOR, and implication operators for any number of variables.",
    "href": "/math-tools/truth-table-generator"
  },
  {
    "name": "Boolean Expression Evaluator – Evaluate Logic Expressions Online",
    "description": "Evaluate any Boolean expression for given variable values with our free online Boolean expression evaluator. Supports all logical operators including AND, OR, NOT, XOR, and more.",
    "href": "/math-tools/boolean-expression-evaluator"
  },
  {
    "name": "Logic Gate Simulator – Simulate AND OR NOT Gates Online",
    "description": "Simulate any combination of digital logic gates with our free online logic gate simulator. Set input values and see real-time output for AND, OR, NOT, NAND, NOR, and XOR gates.",
    "href": "/math-tools/logic-gate-simulator"
  },
  {
    "name": "Data Storage Converter – Convert KB, MB, GB, TB Online",
    "description": "Convert between any digital storage unit with our free online data storage converter. Supports bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
    "href": "/math-tools/data-storage-converter"
  },
  {
    "name": "BODMAS / PEMDAS Calculator – Order of Operations Solver",
    "description": "Solve any math expression using the correct order of operations with our free BODMAS/PEMDAS calculator. Get step-by-step breakdowns to understand exactly how each expression is evaluated.",
    "href": "/math-tools/order-of-operations-solver"
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
