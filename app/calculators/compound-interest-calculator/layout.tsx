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
  title: "Compound Interest Calculator",
  description: "Find out how your money grows when interest compounds on both principal and accumulated earnings. Choose your compounding frequency for accurate projections.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/compound-interest-calculator",
  },
};

const tools = [
  {
    "name": "Compounding Frequency Comparison",
    "description": "Compounding Frequency Comparison Calculator",
    "href": "/calculators/compounding-frequency-comparison"
  },
  {
    "name": "Simple Interest Calculator",
    "description": "Simple Interest Calculator",
    "href": "/calculators/simple-interest-calculator"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/calculators/future-value-calculator"
  },
  {
    "name": "Present Value Calculator",
    "description": "Present Value Calculator",
    "href": "/calculators/present-value-calculator"
  },
  {
    "name": "Rule Of 72 Calculator",
    "description": "Rule of 72 Calculator",
    "href": "/calculators/rule-of-72-calculator"
  },
  {
    "name": "Investment Return Rate Calculator",
    "description": "Investment Return Rate Calculator",
    "href": "/calculators/investment-return-rate-calculator"
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
                    <BreadcrumbLink href="/calculators/compound-interest-calculator">Compound Interest Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Compound Interest Calculator</h1>
        <p className="text-muted-foreground">Find out how your money grows when interest compounds on both principal and accumulated earnings. Choose your compounding frequency for accurate projections.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
