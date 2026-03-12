import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Cricket Economy Rate Calculator – Calculate Bowling Economy Rate",
  description: "Evaluate bowling performance with our Cricket Economy Rate Calculator.            Enter runs conceded and overs bowled to calculate economy rate — the            fundamental metric for assessing a bowler&apos;s ability to restrict run scoring.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cricket-economy-rate-calculator",
  },
};

const tools = [
  {
    "name": "Cricket Strike Rate Calculator",
    "description": "Cricket Strike Rate Calculator – Calculate Batting Strike Rate Instantly",
    "href": "/calculators/cricket-strike-rate-calculator"
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
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/cricket-economy-rate-calculator">Cricket Economy Rate Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
