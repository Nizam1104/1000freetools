import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Ksp Calculator – Solubility Product Constant Made Simple",
  description: "Calculate the solubility product constant (Ksp) or find ion concentrations at equilibrium with our Ksp calculator. Essential for understanding sparingly soluble salts and equilibrium chemistry. Perfect for general and analytical chemistry.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/solubility-product-ksp-calculator",
  },
};

const tools = [
  {
    "name": "Ph Calculator",
    "description": "pH Calculator – Calculate pH from H⁺ Concentration",
    "href": "/ph-calculator"
  },
  {
    "name": "Henderson Hasselbalch Calculator",
    "description": "Henderson-Hasselbalch Calculator – Buffer pH Made Easy",
    "href": "/henderson-hasselbalch-calculator"
  },
  {
    "name": "Pka Pkb Calculator",
    "description": "pKa and pKb Calculator – Convert Ka, Kb, pKa, and pKb",
    "href": "/pka-pkb-calculator"
  },
  {
    "name": "Poh Calculator",
    "description": "pOH Calculator – Calculate pOH and Convert to pH",
    "href": "/poh-calculator"
  },
  {
    "name": "Electrochemical Cell Potential Calculator",
    "description": "Electrochemical Cell Potential Calculator – Calculate EMF of Galvanic Cells",
    "href": "/electrochemical-cell-potential-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator – Convert Solution Concentration Units",
    "href": "/concentration-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Ksp Calculator – Solubility Product Constant Made Simple</h1>
        <p className="text-muted-foreground">Calculate the solubility product constant (Ksp) or find ion concentrations at equilibrium with our Ksp calculator. Essential for understanding sparingly soluble salts and equilibrium chemistry. Perfect for general and analytical chemistry.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
