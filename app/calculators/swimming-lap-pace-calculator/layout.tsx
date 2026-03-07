import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Swimming Lap Pace Calculator – Calculate Your Swim Speed Per 100m",
  description: "Optimize your swim training with our Swimming Lap Pace Calculator.            Enter your total distance and time to calculate your pace per 100 meters —            perfect for competitive swimmers and triathletes tracking their speed and progress.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/swimming-lap-pace-calculator",
  },
};

const tools = [
  {
    "name": "Swimming Calorie Calculator",
    "description": "Swimming Calorie Calculator – How Many Calories Does Swimming Burn?",
    "href": "/calculators/swimming-calorie-calculator"
  },
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator – Calculate Your Target Running Pace",
    "href": "/calculators/marathon-pace-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/calculators/pace-to-speed-converter"
  },
  {
    "name": "Speed To Pace Converter",
    "description": "Speed to Pace Converter – Convert Speed to Running Pace Online",
    "href": "/calculators/speed-to-pace-converter"
  },
  {
    "name": "Heart Rate Recovery Calculator",
    "description": "Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness",
    "href": "/calculators/heart-rate-recovery-calculator"
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
