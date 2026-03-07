import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "VO2 Max Calculator – Estimate Your Aerobic Fitness Level",
  description: "Measure your cardiovascular fitness with our VO2 max calculator. Estimate your maximal oxygen uptake using simple field test data and compare your results to fitness norms.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/vo2-max-calculator",
  },
};

const tools = [
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
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator – Calculate Your Target Running Pace",
    "href": "/calculators/marathon-pace-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/calculators/pace-to-speed-converter"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">VO2 Max Calculator – Estimate Your Aerobic Fitness Level</h1>
        <p className="text-muted-foreground">Measure your cardiovascular fitness with our VO2 max calculator. Estimate your maximal oxygen uptake using simple field test data and compare your results to fitness norms.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
