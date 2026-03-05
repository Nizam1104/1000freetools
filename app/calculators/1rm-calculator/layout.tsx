import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "1RM Calculator – Calculate Your One Rep Max for Any Lift",
  description: "Find your one-rep max without maxing out. Enter the weight and reps you lifted to calculate your estimated 1RM and set smarter strength training goals.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/1rm-calculator",
  },
};

const tools = [
  {
    "name": "Strength Training Pr Estimator",
    "description": "Strength Training PR Estimator – Calculate Your One-Rep Max & Training Weights",
    "href": "/strength-training-pr-estimator"
  },
  {
    "name": "Warm Up Calculator",
    "description": "Warm-Up Calculator – Build the Perfect Warm-Up Set Progression",
    "href": "/warm-up-calculator"
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
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/running-pace-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">1RM Calculator – Calculate Your One Rep Max for Any Lift</h1>
        <p className="text-muted-foreground">Find your one-rep max without maxing out. Enter the weight and reps you lifted to calculate your estimated 1RM and set smarter strength training goals.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
