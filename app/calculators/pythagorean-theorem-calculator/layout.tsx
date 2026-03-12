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
  title: "Pythagorean Theorem Calculator",
  description: "Calculate the missing side of a right triangle: a² + b² = c²",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pythagorean-theorem-calculator",
  },
};

const tools = [
  {
    "name": "Law Of Cosines Calculator",
    "description": "Law of Cosines Calculator",
    "href": "/calculators/law-of-cosines-calculator"
  },
  {
    "name": "Law Of Sines Calculator",
    "description": "Law of Sines Calculator",
    "href": "/calculators/law-of-sines-calculator"
  },
  {
    "name": "Distance Formula Calculator",
    "description": "Distance Formula Calculator – Find Distance Between Two Points",
    "href": "/calculators/distance-formula-calculator"
  },
  {
    "name": "Slope Calculator",
    "description": "Slope Calculator",
    "href": "/calculators/slope-calculator"
  },
  {
    "name": "Triangle Area Calculator",
    "description": "Triangle Area Calculator – Find Area from Base and Height",
    "href": "/calculators/triangle-area-calculator"
  },
  {
    "name": "Linear Equation Solver",
    "description": "Linear Equation Solver – Solve ax + b = 0",
    "href": "/calculators/linear-equation-solver"
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
                    <BreadcrumbLink href="/calculators/pythagorean-theorem-calculator">Pythagorean Theorem Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pythagorean Theorem Calculator</h1>
        <p className="text-muted-foreground">Calculate the missing side of a right triangle: a² + b² = c²</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
