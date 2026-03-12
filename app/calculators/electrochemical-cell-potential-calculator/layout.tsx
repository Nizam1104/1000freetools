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
  title: "Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells",
  description: "Find the standard cell potential (EMF) of galvanic or electrolytic cells using our electrochemical calculator. Enter reduction potentials for cathode and anode to get the cell voltage. Perfect for electrochemistry and physical chemistry students.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/electrochemical-cell-potential-calculator",
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
    "name": "Pka Pkb Calculator",
    "description": "pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb",
    "href": "/calculators/pka-pkb-calculator"
  },
  {
    "name": "Poh Calculator",
    "description": "pOH Calculator – Calculate pOH and Convert to pH",
    "href": "/calculators/poh-calculator"
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
                    <BreadcrumbLink href="/calculators/electrochemical-cell-potential-calculator">Electrochemical Cell Potential Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells</h1>
        <p className="text-muted-foreground">Find the standard cell potential (EMF) of galvanic or electrolytic cells using our electrochemical calculator. Enter reduction potentials for cathode and anode to get the cell voltage. Perfect for electrochemistry and physical chemistry students.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
