import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Biorhythm Calculator – Track Your Physical, Emotional & Intellectual Cycles",
  description: "Discover your natural performance rhythms with our Biorhythm Calculator. Enter your birth date to see your current physical, emotional, and intellectual cycle positions — helping you plan important activities on your peak days.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/biorhythm-calculator",
  },
};

const tools = [
  {
    "name": "Zodiac Sign Calculator",
    "description": "Zodiac Sign Calculator – Free Western Astrology Sign Finder",
    "href": "/zodiac-sign-calculator"
  },
  {
    "name": "Age Calculator",
    "description": "Age Calculator – Calculate Your Exact Age in Years, Months & Days",
    "href": "/age-calculator"
  },
  {
    "name": "Anniversary Calculator",
    "description": "Anniversary Calculator – Free Anniversary Date Counter",
    "href": "/anniversary-calculator"
  },
  {
    "name": "Dopamine Detox Planner",
    "description": "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels",
    "href": "/dopamine-detox-planner"
  },
  {
    "name": "Meditation Timer Scheduler",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
    "href": "/meditation-timer-scheduler"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
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
