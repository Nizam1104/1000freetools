import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Subtraction Calculator – Subtract Numbers Instantly",
  description: "Find the difference between two numbers with our free subtraction calculator. Enter any two values and get instant results – no sign-up required.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/subtraction-calculator",
  },
};

const tools = [
  {
    "name": "Addition Calculator",
    "description": "Addition Calculator",
    "href": "/addition-calculator"
  },
  {
    "name": "Division Calculator",
    "description": "Division Calculator",
    "href": "/division-calculator"
  },
  {
    "name": "Multiplication Calculator",
    "description": "Multiplication Calculator",
    "href": "/multiplication-calculator"
  },
  {
    "name": "Percentage Calculator",
    "description": "Percentage Calculator – Calculate Percentages Instantly",
    "href": "/percentage-calculator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/average-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/weighted-average-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Subtraction Calculator – Subtract Numbers Instantly</h1>
        <p className="text-muted-foreground">Find the difference between two numbers with our free subtraction calculator. Enter any two values and get instant results – no sign-up required.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
