import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Scale Finder – Find the Right Musical Scale for Any Key or Note Set",
  description: "Discover which musical scales fit your notes with our Scale Finder.            Enter a root note and select a scale type to view the notes, intervals,            and diatonic chords — perfect for songwriters and improvising musicians.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/scale-finder",
  },
};

const tools = [
  {
    "name": "Chord Progression Generator",
    "description": "Chord Progression Generator – Create Chord Progressions in Any Key & Scale",
    "href": "/calculators/chord-progression-generator"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/calculators/note-frequency-calculator"
  },
  {
    "name": "Tempo To Delay Time Converter",
    "description": "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms",
    "href": "/calculators/tempo-to-delay-time-converter"
  },
  {
    "name": "Tuning Frequency Converter",
    "description": "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch",
    "href": "/calculators/tuning-frequency-converter"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/calculators/frequency-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/scale-finder">Scale Finder</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
