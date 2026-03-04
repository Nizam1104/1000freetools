import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Running Pace Calculator",
  description: "Calculate your running pace, speed, and estimated finish times. Perfect for training and race planning for 5K, 10K, half marathon, and marathon distances.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/running-pace-calculator",
  },
};

const tools = [
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator – Calculate Your Target Running Pace",
    "href": "/marathon-pace-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/pace-to-speed-converter"
  },
  {
    "name": "Speed To Pace Converter",
    "description": "Speed to Pace Converter – Convert Speed to Running Pace Online",
    "href": "/speed-to-pace-converter"
  },
  {
    "name": "Heart Rate Recovery Calculator",
    "description": "Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness",
    "href": "/heart-rate-recovery-calculator"
  },
  {
    "name": "Heart Rate Zones Calculator",
    "description": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
    "href": "/heart-rate-zones-calculator"
  },
  {
    "name": "Lactate Threshold Calculator",
    "description": "Lactate Threshold Calculator – Find Your Anaerobic Threshold",
    "href": "/lactate-threshold-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Running Pace Calculator</h1>
        <p className="text-muted-foreground">Calculate your running pace, speed, and estimated finish times. Perfect for training and race planning for 5K, 10K, half marathon, and marathon distances.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
