import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Variance Calculator – Calculate Population and Sample Variance",
  description: "Calculate population and sample variance",
  alternates: {
    canonical: "https://1000freetools.com/calculators/variance-calculator",
  },
};

const tools = [
  {
    "name": "Standard Deviation Calculator",
    "description": "Standard Deviation Calculator",
    "href": "/standard-deviation-calculator"
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
    "name": "Range Calculator",
    "description": "Range Calculator",
    "href": "/range-calculator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/average-calculator"
  },
  {
    "name": "Z Score Calculator",
    "description": "Z-Score Calculator",
    "href": "/z-score-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Variance Calculator – Calculate Population and Sample Variance</h1>
        <p className="text-muted-foreground">Calculate population and sample variance</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
