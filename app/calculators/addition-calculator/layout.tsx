import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Addition Calculator",
  description: "Add multiple numbers together",
  alternates: {
    canonical: "https://1000freetools.com/calculators/addition-calculator",
  },
};

const tools = [
  {
    "name": "Division Calculator",
    "description": "Division Calculator",
    "href": "/calculators/division-calculator"
  },
  {
    "name": "Multiplication Calculator",
    "description": "Multiplication Calculator",
    "href": "/calculators/multiplication-calculator"
  },
  {
    "name": "Subtraction Calculator",
    "description": "Subtraction Calculator – Subtract Numbers Instantly",
    "href": "/calculators/subtraction-calculator"
  },
  {
    "name": "Percentage Calculator",
    "description": "Percentage Calculator – Calculate Percentages Instantly",
    "href": "/calculators/percentage-calculator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/calculators/average-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/calculators/weighted-average-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Addition Calculator</h1>
        <p className="text-muted-foreground">Add multiple numbers together</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
