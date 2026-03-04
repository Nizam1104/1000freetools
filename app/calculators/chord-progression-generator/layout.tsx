import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Chord Progression Generator – Create Chord Progressions in Any Key & Scale",
  description: "Find the perfect chord progression for your song with our Chord Progression Generator.            Select your key, scale, and mood to generate common and creative chord sequences —            ideal for songwriters and music producers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/chord-progression-generator",
  },
};

const tools = [
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/note-frequency-calculator"
  },
  {
    "name": "Scale Finder",
    "description": "Scale Finder – Find the Right Musical Scale for Any Key or Note Set",
    "href": "/scale-finder"
  },
  {
    "name": "Tempo To Delay Time Converter",
    "description": "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms",
    "href": "/tempo-to-delay-time-converter"
  },
  {
    "name": "Tuning Frequency Converter",
    "description": "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch",
    "href": "/tuning-frequency-converter"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/frequency-calculator"
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
