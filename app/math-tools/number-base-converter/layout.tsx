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
  title: "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
  description: "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/number-base-converter",
  },
  openGraph: {
    title: "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
    type: "website",
    url: "https://1000freetools.com/math-tools/number-base-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
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
    "name": "Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts",
    "description": "Perform bitwise AND, OR, XOR, NOT, left shift, and right shift operations on integers with our free online bitwise calculator. See binary representations alongside results.",
    "href": "/math-tools/bitwise-operations-calculator"
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
    "name": "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    "description": "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
    "href": "/math-tools/roman-numeral-converter"
  },
  {
    "name": "Data Storage Converter – Convert KB, MB, GB, TB Online",
    "description": "Convert between any digital storage unit with our free online data storage converter. Supports bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
    "href": "/math-tools/data-storage-converter"
  },
  {
    "name": "Scientific Notation Converter – Standard to Scientific Form",
    "description": "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    "href": "/math-tools/scientific-notation-converter"
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
              <BreadcrumbLink href="/math-tools/number-base-converter">Number Base Converter</BreadcrumbLink>
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
