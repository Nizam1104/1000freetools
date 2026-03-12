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
  title: "Gradient Calculator – Find Slope of a Function at a Point",
  description: "Calculate the gradient or slope of any function at a specific point with our free online gradient calculator. Uses differentiation to find the exact rate of change at any x value.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/gradient-slope-calculator",
  },
  openGraph: {
    title: "Gradient Calculator – Find Slope of a Function at a Point",
    description: "Calculate the gradient or slope of any function at a specific point with our free online gradient calculator. Uses differentiation to find the exact rate of change at any x value.",
    type: "website",
    url: "https://1000freetools.com/math-tools/gradient-slope-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Calculator – Find Slope of a Function at a Point",
    description: "Calculate the gradient or slope of any function at a specific point with our free online gradient calculator. Uses differentiation to find the exact rate of change at any x value.",
  },
};

const tools = [
  {
    "name": "Tangent Line Calculator – Find Tangent Line Equation Online",
    "description": "Find the equation of the tangent line to any function at any point with our free online tangent line calculator. Get slope, y-intercept, and the full tangent equation with steps.",
    "href": "/math-tools/tangent-line-calculator"
  },
  {
    "name": "Derivative Calculator – Differentiate Functions Step by Step",
    "description": "Calculate the derivative of any function with our free online derivative calculator. Applies power, product, quotient, and chain rules with detailed step-by-step differentiation shown.",
    "href": "/math-tools/derivative-calculator"
  },
  {
    "name": "Slope Calculator – Find the Slope of a Line Online",
    "description": "Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.",
    "href": "/math-tools/slope-calculator"
  },
  {
    "name": "Definite Integral Calculator – Compute Integrals Numerically",
    "description": "Calculate definite integrals numerically with our free online integral calculator. Evaluate the area under any function curve over any interval with accurate numerical results.",
    "href": "/math-tools/definite-integral-calculator"
  },
  {
    "name": "Limit Calculator – Evaluate Limits of Functions Online",
    "description": "Calculate limits of any function as x approaches a value or infinity with our free online limit calculator. Evaluates one-sided and two-sided limits with clear results.",
    "href": "/math-tools/limit-calculator"
  },
  {
    "name": "Riemann Sum Calculator – Approximate Integral with Rectangles",
    "description": "Approximate integrals using Riemann sums with our free online Riemann sum calculator. Choose from left, right, midpoint, or trapezoidal methods with visual rectangle illustrations.",
    "href": "/math-tools/riemann-sum-calculator"
  },
  {
    "name": "2D Function Plotter – Plot y = f(x) Graphs Online",
    "description": "Plot any mathematical function y = f(x) on an interactive graph with our free online 2D function plotter. Visualize polynomials, trig functions, exponentials, and more instantly.",
    "href": "/math-tools/2d-function-plotter"
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
              <BreadcrumbLink href="/math-tools/gradient-slope-calculator">Gradient Slope Calculator</BreadcrumbLink>
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
