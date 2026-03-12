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
  title: "Division Calculator",
  description: "Divide one number by another",
  alternates: {
    canonical: "https://1000freetools.com/calculators/division-calculator",
  },
};

const tools = [
  {
    "name": "Addition Calculator",
    "description": "Addition Calculator",
    "href": "/calculators/addition-calculator"
  },
  {
    "name": "Multiplication Calculator",
    "description": "Multiplication Calculator",
    "href": "/calculators/multiplication-calculator"
  },
  {
    "name": "Subtraction Calculator",
    "description": "Subtraction Calculator – Subtract Numbers Instantly",
    "href": "/calculators/subtraction-calculator"
  },
  {
    "name": "Percentage Calculator",
    "description": "Percentage Calculator – Calculate Percentages Instantly",
    "href": "/calculators/percentage-calculator"
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
                    <BreadcrumbLink href="/calculators/division-calculator">Division Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Division Calculator</h1>
        <p className="text-muted-foreground">Divide one number by another</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
