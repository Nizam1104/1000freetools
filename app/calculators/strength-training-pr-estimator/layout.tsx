import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights",
  description: "Estimate your one-rep max (1RM) safely with our Strength Training Calculator.            Enter your current lift weight and reps to calculate your estimated 1RM and            find the right weight for any target rep range — perfect for powerlifters            and strength athletes.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/strength-training-pr-estimator",
  },
};

const tools = [
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
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
    "name": "Workout Volume Calculator",
    "description": "Workout Volume Calculator – Track Your Total Training Volume",
    "href": "/calculators/workout-volume-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
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
