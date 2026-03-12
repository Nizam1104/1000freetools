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
  title: "Matrix Addition Calculator",
  description: "Add two matrices of the same dimensions",
  alternates: {
    canonical: "https://1000freetools.com/calculators/matrix-addition-calculator",
  },
};

const tools = [
  {
    "name": "Matrix Multiplication Calculator",
    "description": "Matrix Multiplication Calculator",
    "href": "/calculators/matrix-multiplication-calculator"
  },
  {
    "name": "Determinant Calculator",
    "description": "Determinant Calculator",
    "href": "/calculators/determinant-calculator"
  },
  {
    "name": "Inverse Matrix Calculator",
    "description": "Inverse Matrix Calculator",
    "href": "/calculators/inverse-matrix-calculator"
  },
  {
    "name": "Linear Equation Solver",
    "description": "Linear Equation Solver – Solve ax + b = 0",
    "href": "/calculators/linear-equation-solver"
  },
  {
    "name": "Quadratic Equation Solver",
    "description": "Quadratic Equation Solver",
    "href": "/calculators/quadratic-equation-solver"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
                    <BreadcrumbLink href="/calculators/matrix-addition-calculator">Matrix Addition Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Matrix Addition Calculator</h1>
        <p className="text-muted-foreground">Add two matrices of the same dimensions</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
