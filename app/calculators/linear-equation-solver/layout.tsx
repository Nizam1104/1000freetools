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
  title: "Linear Equation Solver – Solve ax + b = 0",
  description: "Solve equations in the form: ax + b = 0",
  alternates: {
    canonical: "https://1000freetools.com/calculators/linear-equation-solver",
  },
};

const tools = [
  {
    "name": "Quadratic Equation Solver",
    "description": "Quadratic Equation Solver",
    "href": "/calculators/quadratic-equation-solver"
  },
  {
    "name": "Determinant Calculator",
    "description": "Determinant Calculator",
    "href": "/calculators/determinant-calculator"
  },
  {
    "name": "Matrix Addition Calculator",
    "description": "Matrix Addition Calculator",
    "href": "/calculators/matrix-addition-calculator"
  },
  {
    "name": "Matrix Multiplication Calculator",
    "description": "Matrix Multiplication Calculator",
    "href": "/calculators/matrix-multiplication-calculator"
  },
  {
    "name": "Inverse Matrix Calculator",
    "description": "Inverse Matrix Calculator",
    "href": "/calculators/inverse-matrix-calculator"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/calculators/expression-evaluator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/calculators/linear-equation-solver">Linear Equation Solver</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Linear Equation Solver – Solve ax + b = 0</h1>
        <p className="text-muted-foreground">Solve equations in the form: ax + b = 0</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
