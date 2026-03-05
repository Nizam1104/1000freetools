import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Wood Board Feet Calculator – Calculate Lumber Board Footage Instantly",
  description: "Price and plan your woodworking projects accurately with our Wood Board Feet Calculator.            Enter the thickness, width, and length of each board to calculate total board feet —            the standard unit for buying and selling lumber.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wood-board-feet-calculator",
  },
};

const tools = [
  {
    "name": "Win Rate Estimator",
    "description": "Win Rate Calculator – Calculate Your Gaming Win Rate & Win/Loss Ratio",
    "href": "/win-rate-estimator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/wind-chill-calculator"
  },
  {
    "name": "Window Area Calculator",
    "description": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
    "href": "/window-area-calculator"
  },
  {
    "name": "Wine Abv Calculator",
    "description": "Wine ABV Calculator – Calculate Alcohol Content in Homemade Wine",
    "href": "/wine-abv-calculator"
  },
  {
    "name": "Wire Gauge Calculator",
    "description": "Wire Gauge Calculator – Calculate Required Wire Size",
    "href": "/wire-gauge-calculator"
  },
  {
    "name": "Work Calculator",
    "description": "Work Calculator",
    "href": "/work-calculator"
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
