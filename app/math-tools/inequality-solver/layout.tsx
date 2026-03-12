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
  title: "Linear Inequality Solver – Solve and Graph Inequalities Online",
  description: "Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/inequality-solver",
  },
  openGraph: {
    title: "Linear Inequality Solver – Solve and Graph Inequalities Online",
    description: "Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.",
    type: "website",
    url: "https://1000freetools.com/math-tools/inequality-solver",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linear Inequality Solver – Solve and Graph Inequalities Online",
    description: "Solve linear inequalities instantly with our free online inequality solver. Get solutions displayed on a number line with clear step-by-step explanations for all inequality types.",
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
    "name": "Simplify Expression Calculator – Simplify Algebraic Expressions",
    "description": "Simplify any basic algebraic expression instantly with our free online simplify expression calculator. Combine like terms and reduce expressions to their simplest form with ease.",
    "href": "/math-tools/simplify-expression"
  },
  {
    "name": "Number Line Visualizer – Plot Numbers on a Number Line",
    "description": "Visualize numbers, fractions, and inequalities on an interactive number line with our free online number line tool. Plot points and ranges to better understand number concepts.",
    "href": "/math-tools/number-line-visualizer"
  },
  {
    "name": "Absolute Value Calculator – Find |x| of Any Number",
    "description": "Calculate the absolute value of any number or expression instantly with our free online absolute value calculator. Supports positive, negative, and decimal numbers.",
    "href": "/math-tools/absolute-value-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "System of Linear Equations Solver – Solve 2x2 Equation Systems",
    "description": "Solve a system of two linear equations with two variables online. Our free solver uses substitution and elimination methods to find exact solutions with step-by-step explanations.",
    "href": "/math-tools/system-of-equations-solver"
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
              <BreadcrumbLink href="/math-tools/inequality-solver">Inequality Solver</BreadcrumbLink>
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
