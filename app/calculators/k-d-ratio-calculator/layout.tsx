import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "K/D Ratio Calculator – Calculate Your Kill/Death Ratio in Any Game",
  description: "Track your combat performance with our K/D Ratio Calculator.            Enter your total kills and deaths to instantly calculate your Kill/Death ratio —            the most popular metric for measuring skill in FPS and battle royale games.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/k-d-ratio-calculator",
  },
};

const tools = [
  {
    "name": "Basketball Shooting Percentage Calculator",
    "description": "Basketball Shooting Percentage Calculator – Calculate FG%, 3P% & FT%",
    "href": "/calculators/basketball-shooting-percentage-calculator"
  },
  {
    "name": "Win Rate Estimator",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
    "href": "/calculators/win-rate-estimator"
  },
  {
    "name": "Tennis Win Probability Calculator",
    "description": "Tennis Win Probability Calculator – Predict Match Outcome from Player Stats",
    "href": "/calculators/tennis-win-probability-calculator"
  },
  {
    "name": "Cricket Economy Rate Calculator",
    "description": "Cricket Economy Rate Calculator – Calculate Bowling Economy Rate",
    "href": "/calculators/cricket-economy-rate-calculator"
  },
  {
    "name": "Cricket Strike Rate Calculator",
    "description": "Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly",
    "href": "/calculators/cricket-strike-rate-calculator"
  },
  {
    "name": "Football Goal Conversion Calculator",
    "description": "Football Goal Conversion Rate Calculator – Measure Shooting Efficiency",
    "href": "/calculators/football-goal-conversion-calculator"
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
