import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Lactate Threshold Calculator – Find Your Anaerobic Threshold",
  description: "Train at the right intensity with our lactate threshold calculator. Estimate your threshold heart rate and pace to improve endurance performance and training zone accuracy.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/lactate-threshold-calculator",
  },
};

const tools = [
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
    "name": "Vo2 Max Calculator",
    "description": "VO2 Max Calculator – Estimate Your Aerobic Fitness Level",
    "href": "/vo2-max-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Lactate Threshold Calculator – Find Your Anaerobic Threshold</h1>
        <p className="text-muted-foreground">Train at the right intensity with our lactate threshold calculator. Estimate your threshold heart rate and pace to improve endurance performance and training zone accuracy.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
