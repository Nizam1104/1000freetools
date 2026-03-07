import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Standard Deviation Calculator",
  description: "Calculate population and sample standard deviation",
  alternates: {
    canonical: "https://1000freetools.com/calculators/standard-deviation-calculator",
  },
};

const tools = [
  {
    "name": "Variance Calculator",
    "description": "Variance Calculator – Calculate Population and Sample Variance",
    "href": "/calculators/variance-calculator"
  },
  {
    "name": "Median Calculator",
    "description": "Median Calculator",
    "href": "/calculators/median-calculator"
  },
  {
    "name": "Mode Calculator",
    "description": "Mode Calculator",
    "href": "/calculators/mode-calculator"
  },
  {
    "name": "Range Calculator",
    "description": "Range Calculator",
    "href": "/calculators/range-calculator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/calculators/average-calculator"
  },
  {
    "name": "Z Score Calculator",
    "description": "Z-Score Calculator",
    "href": "/calculators/z-score-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Standard Deviation Calculator</h1>
        <p className="text-muted-foreground">Calculate population and sample standard deviation</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
