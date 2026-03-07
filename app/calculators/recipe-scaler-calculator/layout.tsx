import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Recipe Scaler Calculator – Adjust Recipe Servings Instantly",
  description: "Scale your recipes up or down with our free Recipe Scaler Calculator. Enter the original and desired servings to automatically adjust all ingredient quantities — perfect for cooking, baking, and meal prep.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/recipe-scaler-calculator",
  },
};

const tools = [
  {
    "name": "Range Calculator",
    "description": "Range Calculator",
    "href": "/calculators/range-calculator"
  },
  {
    "name": "Range Estimator Ev",
    "description": "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
    "href": "/calculators/range-estimator-ev"
  },
  {
    "name": "Ranking Percentile Calculator",
    "description": "Ranking Percentile Calculator – Find Your Percentile Rank in Class or Exam",
    "href": "/calculators/ranking-percentile-calculator"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/calculators/rc-time-constant-calculator"
  },
  {
    "name": "Reaction Yield Calculator",
    "description": "Reaction Yield Calculator – Calculate Theoretical and Percent Yield",
    "href": "/calculators/reaction-yield-calculator"
  },
  {
    "name": "Rectangle Area Calculator",
    "description": "Rectangle Area Calculator",
    "href": "/calculators/rectangle-area-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
