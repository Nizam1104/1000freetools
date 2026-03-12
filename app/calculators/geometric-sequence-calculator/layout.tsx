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
  title: "Geometric Sequence Calculator",
  description: "Calculate nth term and sum of geometric sequence",
  alternates: {
    canonical: "https://1000freetools.com/calculators/geometric-sequence-calculator",
  },
};

const tools = [
  {
    "name": "Arithmetic Sequence Calculator",
    "description": "Arithmetic Sequence Calculator",
    "href": "/calculators/arithmetic-sequence-calculator"
  },
  {
    "name": "Fibonacci Generator",
    "description": "Fibonacci Generator",
    "href": "/calculators/fibonacci-generator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/calculators/average-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/calculators/weighted-average-calculator"
  },
  {
    "name": "Range Calculator",
    "description": "Range Calculator",
    "href": "/calculators/range-calculator"
  },
  {
    "name": "Standard Deviation Calculator",
    "description": "Standard Deviation Calculator",
    "href": "/calculators/standard-deviation-calculator"
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
              <BreadcrumbLink href="/calculators/geometric-sequence-calculator">Geometric Sequence Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Geometric Sequence Calculator</h1>
        <p className="text-muted-foreground">Calculate nth term and sum of geometric sequence</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
