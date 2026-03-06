import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "System of Linear Equations Solver – Solve 2x2 Equation Systems",
  description: "Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/system-of-equations-solver",
  },
  openGraph: {
    title: "System of Linear Equations Solver – Solve 2x2 Equation Systems",
    description: "Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.",
    type: "website",
    url: "https://1000freetools.com/math-tools/system-of-equations-solver",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "System of Linear Equations Solver – Solve 2x2 Equation Systems",
    description: "Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.",
  },
};

const tools = [
  {
    "name": "Linear Equation Solver – Solve ax + b = c Online",
    "description": "Solve any linear equation of the form ax + b = c instantly with our free online linear equation solver. Get step-by-step solutions for one-variable linear equations.",
    "href": "/math-tools/linear-equation-solver"
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
    "name": "Linear Inequality Solver – Solve and Graph Inequalities Online",
    "description": "Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.",
    "href": "/math-tools/inequality-solver"
  },
  {
    "name": "Simplify Expression Calculator – Simplify Algebraic Expressions",
    "description": "Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.",
    "href": "/math-tools/simplify-expression"
  },
  {
    "name": "Matrix Addition & Subtraction Calculator – Compute Matrices Online",
    "description": "Add or subtract any two matrices with our free online matrix calculator. Supports all matrix sizes with instant results and element-wise computation displayed clearly.",
    "href": "/math-tools/matrix-addition-subtraction-calculator"
  },
  {
    "name": "Matrix Inverse Calculator – Find Inverse of Any Matrix",
    "description": "Find the inverse of any invertible square matrix with our free online matrix inverse calculator. Uses row reduction method with step-by-step solution for 2x2, 3x3, and larger matrices.",
    "href": "/math-tools/matrix-inverse-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
