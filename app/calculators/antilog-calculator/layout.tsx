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
  title: "Antilog Calculator",
  description: "Calculate the inverse logarithm (bˣ)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/antilog-calculator",
  },
};

const tools = [
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
    "name": "Scientific Notation Calculator",
    "description": "Scientific Notation Calculator – Convert to Standard Form",
    "href": "/calculators/scientific-notation-calculator"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/calculators/expression-evaluator"
  },
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/calculators/base-converter-calculator"
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
                    <BreadcrumbLink href="/calculators/antilog-calculator">Antilog Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Antilog Calculator</h1>
        <p className="text-muted-foreground">Calculate the inverse logarithm (bˣ)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
