import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "pOH Calculator – Calculate pOH and Convert to pH",
  description: "Use our pOH calculator to find the pOH of a solution from [OH⁻] concentration, or easily convert between pH and pOH. Essential tool for acid-base chemistry problems and laboratory work.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/poh-calculator",
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">pOH Calculator – Calculate pOH and Convert to pH</h1>
        <p className="text-muted-foreground">Use our pOH calculator to find the pOH of a solution from [OH⁻] concentration, or easily convert between pH and pOH. Essential tool for acid-base chemistry problems and laboratory work.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
