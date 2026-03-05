import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Backpack Load Calculator – Find Your Safe Maximum Pack Weight",
  description: "Protect your body on the trail with our Backpack Load Calculator.            Enter your body weight and trip type to see the maximum recommended            pack weight based on guidelines from hiking experts — preventing            injury from overloaded packs.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/backpack-load-calculator",
  },
};

const tools = [
  {
    "name": "Camping Gear Weight Calculator",
    "description": "Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip",
    "href": "/camping-gear-weight-calculator"
  },
  {
    "name": "Altitude Sickness Risk Calculator",
    "description": "Altitude Sickness Risk Calculator – Assess Your Risk of AMS Before Climbing",
    "href": "/altitude-sickness-risk-calculator"
  },
  {
    "name": "Trail Difficulty Estimator",
    "description": "Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is",
    "href": "/trail-difficulty-estimator"
  },
  {
    "name": "Hiking Pace Calculator",
    "description": "Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule",
    "href": "/hiking-pace-calculator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/wind-chill-calculator"
  },
  {
    "name": "Mountain Oxygen Calculator",
    "description": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
    "href": "/mountain-oxygen-calculator"
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
