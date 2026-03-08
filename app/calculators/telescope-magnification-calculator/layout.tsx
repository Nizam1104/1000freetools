import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Telescope Magnification Calculator – Calculate Power, FOV & Exit Pupil",
  description: "Get the most from your telescope with our Magnification Calculator. Enter your telescope's focal length and eyepiece focal length to calculate magnification power, true field of view, and exit pupil diameter — optimizing your stargazing experience.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/telescope-magnification-calculator",
  },
};

const tools = [
  {
    "name": "Swimming Calorie Calculator",
    "description": "Swimming Calorie Calculator – How Many Calories Does Swimming Burn?",
    "href": "/calculators/swimming-calorie-calculator"
  },
  {
    "name": "Swimming Lap Pace Calculator",
    "description": "Swimming Lap Pace Calculator – Calculate Your Swim Speed Per 100m",
    "href": "/calculators/swimming-lap-pace-calculator"
  },
  {
    "name": "Swp Calculator",
    "description": "SWP Calculator – Systematic Withdrawal Plan",
    "href": "/calculators/swp-calculator"
  },
  {
    "name": "Tdee Calculator",
    "description": "TDEE Calculator – Calculate Your Total Daily Energy Expenditure",
    "href": "/calculators/tdee-calculator"
  },
  {
    "name": "Tea Brewing Strength Calculator",
    "description": "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio",
    "href": "/calculators/tea-brewing-strength-calculator"
  },
  {
    "name": "Tempo To Delay Time Converter",
    "description": "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms",
    "href": "/calculators/tempo-to-delay-time-converter"
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
