import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
  description: "Easily convert your running or cycling pace to speed. Our pace-to-speed converter handles both metric and imperial units so you can track performance your way.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pace-to-speed-converter",
  },
};

const tools = [
  {
    "name": "Speed To Pace Converter",
    "description": "Speed to Pace Converter – Convert Speed to Running Pace Online",
    "href": "/calculators/speed-to-pace-converter"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pace to Speed Converter – Convert Running Pace to Speed Instantly</h1>
        <p className="text-muted-foreground">Easily convert your running or cycling pace to speed. Our pace-to-speed converter handles both metric and imperial units so you can track performance your way.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
