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
  title: "Scientific Notation Calculator – Convert to Standard Form",
  description: "Convert any number to scientific notation instantly. Enter large or small values and get the standard form with mantissa and exponent – perfect for science and engineering calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/scientific-notation-calculator",
  },
};

const tools = [
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/calculators/base-converter-calculator"
  },
  {
    "name": "Decimal To Fraction Calculator",
    "description": "Decimal to Fraction Calculator",
    "href": "/calculators/decimal-to-fraction-calculator"
  },
  {
    "name": "Logarithm Calculator",
    "description": "Logarithm Calculator",
    "href": "/calculators/logarithm-calculator"
  },
  {
    "name": "Exponent Calculator",
    "description": "Exponent Calculator",
    "href": "/calculators/exponent-calculator"
  },
  {
    "name": "Root Calculator",
    "description": "Root Calculator – Calculate Square, Cube and Nth Roots",
    "href": "/calculators/root-calculator"
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
                    <BreadcrumbLink href="/calculators/scientific-notation-calculator">Scientific Notation Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Scientific Notation Calculator – Convert to Standard Form</h1>
        <p className="text-muted-foreground">Convert any number to scientific notation instantly. Enter large or small values and get the standard form with mantissa and exponent – perfect for science and engineering calculations.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
