import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions",
  description: "Resize your canvas perfectly with our Aspect Ratio Calculator. Lock your            width-to-height ratio and enter a new dimension to instantly see the correct            corresponding size — ideal for graphic designers, video editors, and photographers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/canvas-aspect-ratio-calculator",
  },
};

const tools = [
  {
    "name": "Perspective Angle Calculator",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
    "href": "/perspective-angle-calculator"
  },
  {
    "name": "Poster Print Size Calculator",
    "description": "Poster Print Size Calculator – Find the Right Resolution for Any Print Size",
    "href": "/poster-print-size-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/4-percent-rule-retirement-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/50-30-20-budget-rule-calculator"
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
