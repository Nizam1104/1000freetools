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
  title: "Roman Numerals Converter",
  description: "Convert between Roman numerals and decimal numbers",
  alternates: {
    canonical: "https://1000freetools.com/calculators/roman-numerals-converter",
  },
};

const tools = [
  {
    "name": "Number To Words Converter",
    "description": "Number to Words Converter",
    "href": "/calculators/number-to-words-converter"
  },
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
    "name": "Fraction To Decimal Calculator",
    "description": "Fraction to Decimal Calculator",
    "href": "/calculators/fraction-to-decimal-calculator"
  },
  {
    "name": "Simplify Fraction Calculator",
    "description": "Simplify Fraction Calculator",
    "href": "/calculators/simplify-fraction-calculator"
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
                    <BreadcrumbLink href="/calculators/roman-numerals-converter">Roman Numerals Converter</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Roman Numerals Converter</h1>
        <p className="text-muted-foreground">Convert between Roman numerals and decimal numbers</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
