import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly",
  description: "Measure batting aggression with our Cricket Strike Rate Calculator.            Enter runs scored and balls faced to calculate strike rate — the key            metric for evaluating batting speed and scoring efficiency in T20,            ODI, and Test cricket.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cricket-strike-rate-calculator",
  },
};

const tools = [
  {
    "name": "Cricket Economy Rate Calculator",
    "description": "Cricket Economy Rate Calculator – Calculate Bowling Economy Rate",
    "href": "/calculators/cricket-economy-rate-calculator"
  },
  {
    "name": "Basketball Shooting Percentage Calculator",
    "description": "Basketball Shooting Percentage Calculator – Calculate FG%, 3P% & FT%",
    "href": "/calculators/basketball-shooting-percentage-calculator"
  },
  {
    "name": "Football Goal Conversion Calculator",
    "description": "Football Goal Conversion Rate Calculator – Measure Shooting Efficiency",
    "href": "/calculators/football-goal-conversion-calculator"
  },
  {
    "name": "Golf Handicap Calculator",
    "description": "Golf Handicap Calculator – Calculate Your Official Golf Handicap Index",
    "href": "/calculators/golf-handicap-calculator"
  },
  {
    "name": "Tennis Win Probability Calculator",
    "description": "Tennis Win Probability Calculator – Predict Match Outcome from Player Stats",
    "href": "/calculators/tennis-win-probability-calculator"
  },
  {
    "name": "Win Rate Estimator",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
    "href": "/calculators/win-rate-estimator"
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
