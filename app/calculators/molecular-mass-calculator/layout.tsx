import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
  description: "Calculate the molecular mass of any chemical compound by entering its formula. Our molecular mass calculator uses atomic weights to deliver accurate molar mass in g/mol instantly. Useful for chemistry students and lab professionals.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/molecular-mass-calculator",
  },
};

const tools = [
  {
    "name": "Empirical Formula Calculator",
    "description": "Empirical Formula Calculator – Find Empirical Formula from Percent Composition",
    "href": "/empirical-formula-calculator"
  },
  {
    "name": "Percent Composition Calculator",
    "description": "Percent Composition Calculator – Find Mass Percent of Elements",
    "href": "/percent-composition-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator – Convert Solution Concentration Units",
    "href": "/concentration-calculator"
  },
  {
    "name": "Dilution Calculator",
    "description": "Dilution Calculator – C1V1 = C2V2 Solution Dilution Tool",
    "href": "/dilution-calculator"
  },
  {
    "name": "Molarity Calculator",
    "description": "Molarity Calculator – Calculate Molar Concentration Instantly",
    "href": "/molarity-calculator"
  },
  {
    "name": "Molality Calculator",
    "description": "Molality Calculator – Find Molality of Any Solution",
    "href": "/molality-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Molecular Mass Calculator – Calculate Molar Mass of Any Compound</h1>
        <p className="text-muted-foreground">Calculate the molecular mass of any chemical compound by entering its formula. Our molecular mass calculator uses atomic weights to deliver accurate molar mass in g/mol instantly. Useful for chemistry students and lab professionals.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
