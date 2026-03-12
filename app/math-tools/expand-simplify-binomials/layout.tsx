import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Binomial Expansion Calculator – Expand & Simplify Binomials",
  description: "Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/expand-simplify-binomials",
  },
  openGraph: {
    title: "Binomial Expansion Calculator – Expand & Simplify Binomials",
    description: "Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions.",
    type: "website",
    url: "https://1000freetools.com/math-tools/expand-simplify-binomials",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binomial Expansion Calculator – Expand & Simplify Binomials",
    description: "Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions.",
  },
};

const tools = [
  {
    "name": "Simplify Expression Calculator – Simplify Algebraic Expressions",
    "description": "Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.",
    "href": "/math-tools/simplify-expression"
  },
  {
    "name": "Quadratic Equation Solver – Find Roots of ax² + bx + c = 0",
    "description": "Solve any quadratic equation instantly with our free online quadratic equation solver. Find real and complex roots using the quadratic formula with detailed step-by-step solutions.",
    "href": "/math-tools/quadratic-equation-solver"
  },
  {
    "name": "Polynomial Evaluator – Calculate Polynomial Value at Any x",
    "description": "Evaluate any polynomial expression at a given value of x with our free online polynomial evaluator. Supports polynomials of any degree with instant accurate results.",
    "href": "/math-tools/polynomial-evaluator"
  },
  {
    "name": "Binomial Expansion Calculator – Expand (a+b)^n Online",
    "description": "Expand any binomial expression (a + b)^n with our free online binomial expansion calculator. Uses the binomial theorem with Pascal's triangle coefficients and full term listing.",
    "href": "/math-tools/binomial-expansion-calculator"
  },
  {
    "name": "Pascal's Triangle Generator – Generate Pascal's Triangle Online",
    "description": "Generate Pascal's Triangle up to any number of rows with our free online generator. Visualize binomial coefficients, patterns, and number relationships in a clear triangle format.",
    "href": "/math-tools/pascals-triangle-generator"
  },
  {
    "name": "Linear Equation Solver – Solve ax + b = c Online",
    "description": "Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.",
    "href": "/math-tools/linear-equation-solver"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
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
