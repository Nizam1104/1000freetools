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
  title: "pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb",
  description: "Convert between Ka, Kb, pKa, and pKb values effortlessly with our pKa/pKb calculator. Use the relationship pKa + pKb = 14 to find acid and base dissociation constants. Essential for acid-base chemistry and biochemistry.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pka-pkb-calculator",
  },
};

const tools = [
  {
    "name": "Ph Calculator",
    "description": "pH Calculator – Calculate pH from H⁺ Concentration",
    "href": "/calculators/ph-calculator"
  },
  {
    "name": "Henderson Hasselbalch Calculator",
    "description": "Henderson-Hasselbalch Calculator – Buffer pH Made Easy",
    "href": "/calculators/henderson-hasselbalch-calculator"
  },
  {
    "name": "Poh Calculator",
    "description": "pOH Calculator – Calculate pOH and Convert to pH",
    "href": "/calculators/poh-calculator"
  },
  {
    "name": "Electrochemical Cell Potential Calculator",
    "description": "Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells",
    "href": "/calculators/electrochemical-cell-potential-calculator"
  },
  {
    "name": "Titration Calculator",
    "description": "Titration Calculator – Find Unknown Concentration from Titration Data",
    "href": "/calculators/titration-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator – Convert Solution Concentration Units",
    "href": "/calculators/concentration-calculator"
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
                    <BreadcrumbLink href="/calculators/pka-pkb-calculator">Pka Pkb Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb</h1>
        <p className="text-muted-foreground">Convert between Ka, Kb, pKa, and pKb values effortlessly with our pKa/pKb calculator. Use the relationship pKa + pKb = 14 to find acid and base dissociation constants. Essential for acid-base chemistry and biochemistry.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
