import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Average Calculator – Calculate Mean, Median & More",
  description: "Calculate the mean (average), median, and other statistics for any set of numbers. Enter values separated by commas or spaces for instant results.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/average-calculator",
  },
};

const tools = [
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
    "name": "Range Calculator",
    "description": "Range Calculator",
    "href": "/range-calculator"
  },
  {
    "name": "Standard Deviation Calculator",
    "description": "Standard Deviation Calculator",
    "href": "/standard-deviation-calculator"
  },
  {
    "name": "Variance Calculator",
    "description": "Variance Calculator – Calculate Population and Sample Variance",
    "href": "/variance-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Average Calculator – Calculate Mean, Median & More</h1>
        <p className="text-muted-foreground">Calculate the mean (average), median, and other statistics for any set of numbers. Enter values separated by commas or spaces for instant results.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
