import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Stoichiometry Calculator – Balance Chemical Reactions Instantly",
  description: "Solve stoichiometry problems effortlessly with our stoichiometry calculator. Input your balanced chemical equation coefficients and known quantities to find moles, grams, or molecules of reactants and products. A must-have tool for chemistry students.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/stoichiometry-calculator",
  },
};

const tools = [
  {
    "name": "Reaction Yield Calculator",
    "description": "Reaction Yield Calculator – Calculate Theoretical and Percent Yield",
    "href": "/calculators/reaction-yield-calculator"
  },
  {
    "name": "Empirical Formula Calculator",
    "description": "Empirical Formula Calculator – Find Empirical Formula from Percent Composition",
    "href": "/calculators/empirical-formula-calculator"
  },
  {
    "name": "Molecular Mass Calculator",
    "description": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
    "href": "/calculators/molecular-mass-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Stoichiometry Calculator – Balance Chemical Reactions Instantly</h1>
        <p className="text-muted-foreground">Solve stoichiometry problems effortlessly with our stoichiometry calculator. Input your balanced chemical equation coefficients and known quantities to find moles, grams, or molecules of reactants and products. A must-have tool for chemistry students.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
