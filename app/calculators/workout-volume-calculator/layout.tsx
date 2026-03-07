import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Workout Volume Calculator – Track Your Total Training Volume",
  description: "Monitor your workout progress with our training volume calculator. Calculate total sets, reps, and weight lifted to ensure progressive overload and consistent gains.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/workout-volume-calculator",
  },
};

const tools = [
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
  },
  {
    "name": "Strength Training Pr Estimator",
    "description": "Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights",
    "href": "/calculators/strength-training-pr-estimator"
  },
  {
    "name": "Warm Up Calculator",
    "description": "Warm-Up Calculator – Build the Perfect Warm-Up Set Progression",
    "href": "/calculators/warm-up-calculator"
  },
  {
    "name": "Workout Max Reps Estimator",
    "description": "Max Reps Estimator – How Many Reps Can You Do at a Given Weight?",
    "href": "/calculators/workout-max-reps-estimator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Heart Rate Zones Calculator",
    "description": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
    "href": "/calculators/heart-rate-zones-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Workout Volume Calculator – Track Your Total Training Volume</h1>
        <p className="text-muted-foreground">Monitor your workout progress with our training volume calculator. Calculate total sets, reps, and weight lifted to ensure progressive overload and consistent gains.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
