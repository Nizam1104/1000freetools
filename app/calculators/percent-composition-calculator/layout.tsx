import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Percent Composition Calculator – Find Mass Percent of Elements",
  description: "Determine the percent composition by mass of each element in a compound with our free percent composition calculator. Enter the chemical formula and get accurate elemental percentages instantly. Perfect for chemistry coursework and analysis.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/percent-composition-calculator",
  },
};

const tools = [
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Percent Composition Calculator – Find Mass Percent of Elements</h1>
        <p className="text-muted-foreground">Determine the percent composition by mass of each element in a compound with our free percent composition calculator. Enter the chemical formula and get accurate elemental percentages instantly. Perfect for chemistry coursework and analysis.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
