import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "XP Progression Calculator – Calculate How Long to Reach Your Target Level",
  description: "Plan your grinding sessions with our XP Progression Calculator.            Enter your current XP, target level XP threshold, and average XP per hour            to see how long it will take to level up in your favorite RPG or online game.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/xp-progression-calculator",
  },
};

const tools = [
  {
    "name": "K D Ratio Calculator",
    "description": "K/D Ratio Calculator – Calculate Your Kill/Death Ratio in Any Game",
    "href": "/calculators/k-d-ratio-calculator"
  },
  {
    "name": "Win Rate Estimator",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
    "href": "/calculators/win-rate-estimator"
  },
  {
    "name": "Gacha Pull Probability Calculator",
    "description": "Gacha Pull Probability Calculator – Calculate Your Odds in Gacha Games",
    "href": "/calculators/gacha-pull-probability-calculator"
  },
  {
    "name": "Loot Probability Calculator",
    "description": "Loot Drop Probability Calculator – Calculate Your Chances of Getting Rare Items",
    "href": "/calculators/loot-probability-calculator"
  },
  {
    "name": "Random Number Generator",
    "description": "Random Number Generator",
    "href": "/calculators/random-number-generator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
