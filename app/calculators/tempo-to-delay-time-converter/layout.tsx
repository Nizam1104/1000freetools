import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms",
  description: "Sync your delay effects perfectly with your track's tempo using our BPM to Delay Converter. Enter your song's BPM to get delay times in milliseconds for quarter notes, eighth notes, dotted values, and more — essential for producers and guitarists.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/tempo-to-delay-time-converter",
  },
};

const tools = [
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/note-frequency-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/frequency-calculator"
  },
  {
    "name": "Tuning Frequency Converter",
    "description": "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch",
    "href": "/tuning-frequency-converter"
  },
  {
    "name": "Scale Finder",
    "description": "Scale Finder – Find the Right Musical Scale for Any Key or Note Set",
    "href": "/scale-finder"
  },
  {
    "name": "Chord Progression Generator",
    "description": "Chord Progression Generator – Create Chord Progressions in Any Key & Scale",
    "href": "/chord-progression-generator"
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
