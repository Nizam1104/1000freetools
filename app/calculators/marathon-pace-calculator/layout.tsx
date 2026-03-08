import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Marathon Pace Calculator – Calculate Your Target Running Pace",
  description: "Plan your race strategy with our Marathon Pace Calculator. Enter your target finish time for any distance — 5K to 100-mile ultra — to get your required pace per kilometer and mile, plus splits for race day.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/marathon-pace-calculator",
  },
};

const tools = [
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
  },
  {
    "name": "Heart Rate Zones Calculator",
    "description": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
    "href": "/calculators/heart-rate-zones-calculator"
  },
  {
    "name": "Lactate Threshold Calculator",
    "description": "Lactate Threshold Calculator – Find Your Anaerobic Threshold",
    "href": "/calculators/lactate-threshold-calculator"
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
