import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Football Goal Conversion Rate Calculator – Measure Shooting Efficiency",
  description: "Assess a striker&apos;s clinical finishing with our Football Goal Conversion Calculator.            Enter total goals scored and shots attempted to calculate goal conversion rate —            a vital metric for evaluating attacking effectiveness in football/soccer.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/football-goal-conversion-calculator",
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
    "name": "Golf Handicap Calculator",
    "description": "Golf Handicap Calculator – Calculate Your Official Golf Handicap Index",
    "href": "/golf-handicap-calculator"
  },
  {
    "name": "Tennis Win Probability Calculator",
    "description": "Tennis Win Probability Calculator – Predict Match Outcome from Player Stats",
    "href": "/tennis-win-probability-calculator"
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
