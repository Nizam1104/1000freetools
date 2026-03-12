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
  title: "Pascal's Triangle Generator – Generate Pascal's Triangle Online",
  description: "Generate Pascal's Triangle up to any number of rows with our free online generator. Visualize binomial coefficients, patterns, and number relationships in a clear triangle format.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/pascals-triangle-generator",
  },
  openGraph: {
    title: "Pascal's Triangle Generator – Generate Pascal's Triangle Online",
    description: "Generate Pascal's Triangle up to any number of rows with our free online generator. Visualize binomial coefficients, patterns, and number relationships in a clear triangle format.",
    type: "website",
    url: "https://1000freetools.com/math-tools/pascals-triangle-generator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal's Triangle Generator – Generate Pascal's Triangle Online",
    description: "Generate Pascal's Triangle up to any number of rows with our free online generator. Visualize binomial coefficients, patterns, and number relationships in a clear triangle format.",
  },
};

const tools = [
  {
    "name": "Binomial Expansion Calculator – Expand (a+b)^n Online",
    "description": "Expand any binomial expression (a + b)^n with our free online binomial expansion calculator. Uses the binomial theorem with Pascal's triangle coefficients and full term listing.",
    "href": "/math-tools/binomial-expansion-calculator"
  },
  {
    "name": "Binomial Expansion Calculator – Expand & Simplify Binomials",
    "description": "Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions.",
    "href": "/math-tools/expand-simplify-binomials"
  },
  {
    "name": "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    "description": "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    "href": "/math-tools/fibonacci-generator"
  },
  {
    "name": "Permutation Calculator – Calculate nPr Online",
    "description": "Calculate permutations (nPr) instantly with our free online permutation calculator. Find the number of ways r items can be arranged from n items with formula and solution shown.",
    "href": "/math-tools/permutation-calculator"
  },
  {
    "name": "Combination Calculator – Calculate nCr Online",
    "description": "Calculate combinations (nCr) instantly with our free online combination calculator. Find how many ways r items can be chosen from n items using the combination formula.",
    "href": "/math-tools/combination-calculator"
  },
  {
    "name": "Factorial Calculator – Compute n! Instantly Online",
    "description": "Calculate the factorial of any non-negative integer instantly with our free online factorial calculator. Supports large factorials with exact results.",
    "href": "/math-tools/factorial-calculator"
  },
  {
    "name": "Truth Table Generator – Create Logic Truth Tables Online",
    "description": "Generate truth tables for any logical expression with our free online truth table generator. Supports AND, OR, NOT, XOR, NAND, NOR, and implication operators for any number of variables.",
    "href": "/math-tools/truth-table-generator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
              <BreadcrumbLink href="/math-tools/pascals-triangle-generator">Pascals Triangle Generator</BreadcrumbLink>
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
