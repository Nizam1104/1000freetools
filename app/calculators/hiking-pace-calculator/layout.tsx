import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule",
  description: "Plan your hike with confidence using our Hiking Pace Calculator. Enter trail distance, elevation gain, and your fitness level to estimate total hiking time using Naismith's Rule — helping you plan water, food, and daylight requirements accurately.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/hiking-pace-calculator",
  },
};

const tools = [
  {
    "name": "Trail Difficulty Estimator",
    "description": "Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is",
    "href": "/trail-difficulty-estimator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/running-pace-calculator"
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
    "name": "Backpack Load Calculator",
    "description": "Backpack Load Calculator – Find Your Safe Maximum Pack Weight",
    "href": "/backpack-load-calculator"
  },
  {
    "name": "Camping Gear Weight Calculator",
    "description": "Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip",
    "href": "/camping-gear-weight-calculator"
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
