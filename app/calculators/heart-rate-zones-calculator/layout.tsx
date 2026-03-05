import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
  description: "Train smarter with our heart rate zones calculator. Discover your five heart rate training zones to optimize fat burn, aerobic fitness, and peak performance.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/heart-rate-zones-calculator",
  },
};

const tools = [
  {
    "name": "Heart Rate Recovery Calculator",
    "description": "Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness",
    "href": "/heart-rate-recovery-calculator"
  },
  {
    "name": "Vo2 Max Calculator",
    "description": "VO2 Max Calculator – Estimate Your Aerobic Fitness Level",
    "href": "/vo2-max-calculator"
  },
  {
    "name": "Lactate Threshold Calculator",
    "description": "Lactate Threshold Calculator – Find Your Anaerobic Threshold",
    "href": "/lactate-threshold-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/running-pace-calculator"
  },
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator – Calculate Your Target Running Pace",
    "href": "/marathon-pace-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/pace-to-speed-converter"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Heart Rate Zones Calculator – Find Your Target Heart Rate Zones</h1>
        <p className="text-muted-foreground">Train smarter with our heart rate zones calculator. Discover your five heart rate training zones to optimize fat burn, aerobic fitness, and peak performance.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
