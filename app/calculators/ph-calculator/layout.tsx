import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "pH Calculator – Calculate pH from H⁺ Concentration",
  description: "Determine the pH of any solution instantly with our pH calculator. Input the hydrogen ion concentration [H⁺] or pH value to convert between them. Great for chemistry students, teachers, and lab professionals.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ph-calculator",
  },
};

const tools = [
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
        <h1 className="text-3xl font-bold mb-3">pH Calculator – Calculate pH from H⁺ Concentration</h1>
        <p className="text-muted-foreground">Determine the pH of any solution instantly with our pH calculator. Input the hydrogen ion concentration [H⁺] or pH value to convert between them. Great for chemistry students, teachers, and lab professionals.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
