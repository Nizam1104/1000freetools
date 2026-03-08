import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Weight Loss Time Calculator – How Long Will It Take to Lose Weight?",
  description: "Plan your weight loss journey with confidence. Enter your current weight, goal weight, and daily deficit to see a realistic timeline for reaching your target.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/weight-loss-time-calculator",
  },
};

const tools = [
  {
    "name": "Water Tank Volume Calculator",
    "description": "Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons",
    "href": "/calculators/water-tank-volume-calculator"
  },
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/calculators/wavelength-calculator"
  },
  {
    "name": "Wealth Growth Projection Calculator",
    "description": "Wealth Growth Projection Calculator",
    "href": "/calculators/wealth-growth-projection-calculator"
  },
  {
    "name": "Week Number Calculator",
    "description": "Week Number Calculator – Find ISO Week Number for Any Date",
    "href": "/calculators/week-number-calculator"
  },
  {
    "name": "Weight Distribution Calculator",
    "description": "Weight Distribution Calculator – Calculate Load Distribution Across Axles & Points",
    "href": "/calculators/weight-distribution-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Weight Loss Time Calculator – How Long Will It Take to Lose Weight?</h1>
        <p className="text-muted-foreground">Plan your weight loss journey with confidence. Enter your current weight, goal weight, and daily deficit to see a realistic timeline for reaching your target.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
