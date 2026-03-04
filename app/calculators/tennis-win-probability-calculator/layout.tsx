import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Tennis Win Probability Calculator – Predict Match Outcome from Player Stats",
  description: "Predict tennis match outcomes with our Win Probability Calculator.            Enter each player&apos;s serve win percentage and break point conversion            rates to calculate the probability of winning sets and the overall match.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/tennis-win-probability-calculator",
  },
};

const tools = [
  {
    "name": "Basketball Shooting Percentage Calculator",
    "description": "Basketball Shooting Percentage Calculator – Calculate FG%, 3P% & FT%",
    "href": "/basketball-shooting-percentage-calculator"
  },
  {
    "name": "Cricket Economy Rate Calculator",
    "description": "Cricket Economy Rate Calculator – Calculate Bowling Economy Rate",
    "href": "/cricket-economy-rate-calculator"
  },
  {
    "name": "Cricket Strike Rate Calculator",
    "description": "Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly",
    "href": "/cricket-strike-rate-calculator"
  },
  {
    "name": "Football Goal Conversion Calculator",
    "description": "Football Goal Conversion Rate Calculator – Measure Shooting Efficiency",
    "href": "/football-goal-conversion-calculator"
  },
  {
    "name": "Golf Handicap Calculator",
    "description": "Golf Handicap Calculator – Calculate Your Official Golf Handicap Index",
    "href": "/golf-handicap-calculator"
  },
  {
    "name": "Win Rate Estimator",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
    "href": "/win-rate-estimator"
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
