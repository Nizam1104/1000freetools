import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Warm-Up Calculator – Build the Perfect Warm-Up Set Progression",
  description: "Prepare your body and CNS for heavy lifting. Our warm-up calculator generates a complete set-by-set warm-up progression leading up to your working weight.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/warm-up-calculator",
  },
};

const tools = [
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/1rm-calculator"
  },
  {
    "name": "Strength Training Pr Estimator",
    "description": "Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights",
    "href": "/strength-training-pr-estimator"
  },
  {
    "name": "Workout Max Reps Estimator",
    "description": "Max Reps Estimator – How Many Reps Can You Do at a Given Weight?",
    "href": "/workout-max-reps-estimator"
  },
  {
    "name": "Workout Volume Calculator",
    "description": "Workout Volume Calculator – Track Your Total Training Volume",
    "href": "/workout-volume-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/running-pace-calculator"
  },
  {
    "name": "Heart Rate Zones Calculator",
    "description": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
    "href": "/heart-rate-zones-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Warm-Up Calculator – Build the Perfect Warm-Up Set Progression</h1>
        <p className="text-muted-foreground">Prepare your body and CNS for heavy lifting. Our warm-up calculator generates a complete set-by-set warm-up progression leading up to your working weight.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
