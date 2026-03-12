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
  title: "Tuning Frequency Converter – Convert Between Standard & Alternative Concert Pitch",
  description: "Explore alternative tuning standards with our Tuning Frequency Converter.            Change the A4 reference pitch from 440Hz to 432Hz, 444Hz, or any custom value            and see how every note&apos;s frequency adjusts — useful for musicians working            with different orchestras and DAWs.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/tuning-frequency-converter",
  },
};

const tools = [
  {
    "name": "Tempo To Delay Time Converter",
    "description": "Tempo to Delay Time Converter – Convert BPM to Delay & Echo Times in ms",
    "href": "/calculators/tempo-to-delay-time-converter"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/calculators/note-frequency-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/calculators/frequency-calculator"
  },
  {
    "name": "Scale Finder",
    "description": "Scale Finder – Find the Right Musical Scale for Any Key or Note Set",
    "href": "/calculators/scale-finder"
  },
  {
    "name": "Chord Progression Generator",
    "description": "Chord Progression Generator – Create Chord Progressions in Any Key & Scale",
    "href": "/calculators/chord-progression-generator"
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
              <BreadcrumbLink href="/calculators/tuning-frequency-converter">Tuning Frequency Converter</BreadcrumbLink>
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
