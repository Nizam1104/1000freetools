import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Altitude Sickness Risk Calculator – Assess Your Risk of AMS Before Climbing",
  description: "Stay safe at high altitude with our Altitude Sickness Risk Calculator.            Enter your ascent rate, target altitude, and health risk factors to evaluate            your Acute Mountain Sickness (AMS) risk level and get acclimatization recommendations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/altitude-sickness-risk-calculator",
  },
};

const tools = [
  {
    "name": "Mountain Oxygen Calculator",
    "description": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
    "href": "/calculators/mountain-oxygen-calculator"
  },
  {
    "name": "Backpack Load Calculator",
    "description": "Backpack Load Calculator – Find Your Safe Maximum Pack Weight",
    "href": "/calculators/backpack-load-calculator"
  },
  {
    "name": "Camping Gear Weight Calculator",
    "description": "Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip",
    "href": "/calculators/camping-gear-weight-calculator"
  },
  {
    "name": "Trail Difficulty Estimator",
    "description": "Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is",
    "href": "/calculators/trail-difficulty-estimator"
  },
  {
    "name": "Hiking Pace Calculator",
    "description": "Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule",
    "href": "/calculators/hiking-pace-calculator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/calculators/wind-chill-calculator"
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
