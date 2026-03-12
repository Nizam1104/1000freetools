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
  title: "Molarity Calculator – Calculate Molar Concentration Instantly",
  description: "Use our free molarity calculator to find the molar concentration of a solution. Enter moles of solute and volume of solution to get accurate results in seconds. Perfect for chemistry students, lab technicians, and researchers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/molarity-calculator",
  },
};

const tools = [
  {
    "name": "Molality Calculator",
    "description": "Molality Calculator – Find Molality of Any Solution",
    "href": "/calculators/molality-calculator"
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
    "name": "Molecular Mass Calculator",
    "description": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
    "href": "/calculators/molecular-mass-calculator"
  },
  {
    "name": "Moles To Volume Converter",
    "description": "Moles to Volume Calculator for Gas – STP and Custom Conditions",
    "href": "/calculators/moles-to-volume-converter"
  },
  {
    "name": "Percent Composition Calculator",
    "description": "Percent Composition Calculator – Find Mass Percent of Elements",
    "href": "/calculators/percent-composition-calculator"
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
                    <BreadcrumbLink href="/calculators/molarity-calculator">Molarity Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Molarity Calculator – Calculate Molar Concentration Instantly</h1>
        <p className="text-muted-foreground">Use our free molarity calculator to find the molar concentration of a solution. Enter moles of solute and volume of solution to get accurate results in seconds. Perfect for chemistry students, lab technicians, and researchers.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
