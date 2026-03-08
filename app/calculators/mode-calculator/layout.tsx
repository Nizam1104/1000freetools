import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Mode Calculator",
  description: "Find the most frequently occurring value(s)",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mode-calculator",
  },
};

const tools = [
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/calculators/average-calculator"
  },
  {
    "name": "Median Calculator",
    "description": "Median Calculator",
    "href": "/calculators/median-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/calculators/weighted-average-calculator"
  },
  {
    "name": "Range Calculator",
    "description": "Range Calculator",
    "href": "/calculators/range-calculator"
  },
  {
    "name": "Standard Deviation Calculator",
    "description": "Standard Deviation Calculator",
    "href": "/calculators/standard-deviation-calculator"
  },
  {
    "name": "Variance Calculator",
    "description": "Variance Calculator – Calculate Population and Sample Variance",
    "href": "/calculators/variance-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Mode Calculator</h1>
        <p className="text-muted-foreground">Find the most frequently occurring value(s)</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
