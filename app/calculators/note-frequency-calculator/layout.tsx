import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
  description: "Find the exact frequency of any musical note with our Note Frequency Calculator.            Enter a note name and octave to instantly get its frequency in Hz — perfect for            musicians, audio engineers, and instrument tuners.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/note-frequency-calculator",
  },
};

const tools = [
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/frequency-calculator"
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
    "name": "Chord Progression Generator",
    "description": "Chord Progression Generator – Create Chord Progressions in Any Key & Scale",
    "href": "/chord-progression-generator"
  },
  {
    "name": "Doppler Effect Calculator",
    "description": "Doppler Effect Calculator – Calculate Frequency Shift",
    "href": "/doppler-effect-calculator"
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
