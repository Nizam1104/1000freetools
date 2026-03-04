import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rounding Calculator – Round Numbers to Decimal Places",
  description: "Round any number to specified decimal places instantly with our free Rounding Calculator. Enter your number and choose decimal places for currency, science, or general math — uses standard round-half-up method for accurate results.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rounding-calculator",
  },
};

const tools = [
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
    "name": "Median Calculator",
    "description": "Median Calculator",
    "href": "/median-calculator"
  },
  {
    "name": "Mode Calculator",
    "description": "Mode Calculator",
    "href": "/mode-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/weighted-average-calculator"
  },
  {
    "name": "Expression Evaluator",
    "description": "Expression Evaluator",
    "href": "/expression-evaluator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Rounding Calculator – Round Numbers to Decimal Places</h1>
        <p className="text-muted-foreground">Round any number to specified decimal places instantly with our free Rounding Calculator. Enter your number and choose decimal places for currency, science, or general math — uses standard round-half-up method for accurate results.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
