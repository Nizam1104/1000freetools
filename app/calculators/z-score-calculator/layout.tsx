import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Z-Score Calculator",
  description: "Calculate the standard score and percentile",
  alternates: {
    canonical: "https://1000freetools.com/calculators/z-score-calculator",
  },
};

const tools = [
  {
    "name": "Standard Deviation Calculator",
    "description": "Standard Deviation Calculator",
    "href": "/standard-deviation-calculator"
  },
  {
    "name": "Variance Calculator",
    "description": "Variance Calculator – Calculate Population and Sample Variance",
    "href": "/variance-calculator"
  },
  {
    "name": "Ranking Percentile Calculator",
    "description": "Ranking Percentile Calculator – Find Your Percentile Rank in Class or Exam",
    "href": "/ranking-percentile-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Z-Score Calculator</h1>
        <p className="text-muted-foreground">Calculate the standard score and percentile</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
