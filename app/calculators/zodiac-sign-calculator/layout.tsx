import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Zodiac Sign Calculator – Free Western Astrology Sign Finder",
  description: "Discover your Western zodiac sign from your birth date. Get detailed information about your sign including element, ruling planet, date range, and key personality traits.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/zodiac-sign-calculator",
  },
};

const tools = [
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
    "name": "Biorhythm Calculator",
    "description": "Biorhythm Calculator – Track Your Physical, Emotional & Intellectual Cycles",
    "href": "/biorhythm-calculator"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Zodiac Sign Calculator – Free Western Astrology Sign Finder</h1>
        <p className="text-muted-foreground">Discover your Western zodiac sign from your birth date. Get detailed information about your sign including element, ruling planet, date range, and key personality traits.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
