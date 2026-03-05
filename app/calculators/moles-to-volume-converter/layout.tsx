import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Moles to Volume Calculator for Gas – STP and Custom Conditions",
  description: "Convert moles of gas to liters at STP or any temperature and pressure with our moles-to-volume gas calculator. Uses the ideal gas law for accurate results. Great for chemistry students and lab professionals.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/moles-to-volume-converter",
  },
};

const tools = [
  {
    "name": "Molarity Calculator",
    "description": "Molarity Calculator – Calculate Molar Concentration Instantly",
    "href": "/molarity-calculator"
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
    "name": "Molality Calculator",
    "description": "Molality Calculator – Find Molality of Any Solution",
    "href": "/molality-calculator"
  },
  {
    "name": "Molecular Mass Calculator",
    "description": "Molecular Mass Calculator – Calculate Molar Mass of Any Compound",
    "href": "/molecular-mass-calculator"
  },
  {
    "name": "Percent Composition Calculator",
    "description": "Percent Composition Calculator – Find Mass Percent of Elements",
    "href": "/percent-composition-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Moles to Volume Calculator for Gas – STP and Custom Conditions</h1>
        <p className="text-muted-foreground">Convert moles of gas to liters at STP or any temperature and pressure with our moles-to-volume gas calculator. Uses the ideal gas law for accurate results. Great for chemistry students and lab professionals.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
