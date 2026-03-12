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
  title: "Empirical Formula Calculator – Find Empirical Formula from Percent Composition",
  description: "Find the empirical formula of any compound using our free empirical formula calculator. Enter percent composition or mass of each element to instantly get the simplest whole-number ratio. Great for general and organic chemistry students.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/empirical-formula-calculator",
  },
};

const tools = [
  {
    "name": "Molecular Mass Calculator",
    "description": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
    "href": "/calculators/molecular-mass-calculator"
  },
  {
    "name": "Percent Composition Calculator",
    "description": "Percent Composition Calculator – Find Mass Percent of Elements",
    "href": "/calculators/percent-composition-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator – Convert Solution Concentration Units",
    "href": "/calculators/concentration-calculator"
  },
  {
    "name": "Dilution Calculator",
    "description": "Dilution Calculator – C1V1 = C2V2 Solution Dilution Tool",
    "href": "/calculators/dilution-calculator"
  },
  {
    "name": "Molarity Calculator",
    "description": "Molarity Calculator – Calculate Molar Concentration Instantly",
    "href": "/calculators/molarity-calculator"
  },
  {
    "name": "Molality Calculator",
    "description": "Molality Calculator – Find Molality of Any Solution",
    "href": "/calculators/molality-calculator"
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
                    <BreadcrumbLink href="/calculators/empirical-formula-calculator">Empirical Formula Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Empirical Formula Calculator – Find Empirical Formula from Percent Composition</h1>
        <p className="text-muted-foreground">Find the empirical formula of any compound using our free empirical formula calculator. Enter percent composition or mass of each element to instantly get the simplest whole-number ratio. Great for general and organic chemistry students.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
