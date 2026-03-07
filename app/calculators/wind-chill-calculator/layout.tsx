import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
  description: "Dress appropriately for the weather with our Wind Chill Calculator. Enter the air temperature and wind speed to calculate the real feel temperature — essential for outdoor activity planning in cold and windy conditions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wind-chill-calculator",
  },
};

const tools = [
  {
    "name": "Weight Distribution Calculator",
    "description": "Weight Distribution Calculator – Calculate Load Distribution Across Axles & Points",
    "href": "/calculators/weight-distribution-calculator"
  },
  {
    "name": "Weight Loss Time Calculator",
    "description": "Weight Loss Time Calculator – How Long Will It Take to Lose Weight?",
    "href": "/calculators/weight-loss-time-calculator"
  },
  {
    "name": "Weighted Average Calculator",
    "description": "Weighted Average Calculator",
    "href": "/calculators/weighted-average-calculator"
  },
  {
    "name": "Welding Strength Calculator",
    "description": "Welding Strength Calculator – Calculate Weld Strength",
    "href": "/calculators/welding-strength-calculator"
  },
  {
    "name": "Win Rate Estimator",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
    "href": "/calculators/win-rate-estimator"
  },
  {
    "name": "Window Area Calculator",
    "description": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
    "href": "/calculators/window-area-calculator"
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
