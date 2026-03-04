import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Doppler Effect Calculator – Calculate Frequency Shift",
  description: "Calculate the observed frequency shift due to relative motion between source and observer. Works for both sound and light waves.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/doppler-effect-calculator",
  },
};

const tools = [
  {
    "name": "Acoustic Impedance Calculator",
    "description": "Acoustic Impedance Calculator – Calculate Z",
    "href": "/acoustic-impedance-calculator"
  },
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/wavelength-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/frequency-calculator"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/note-frequency-calculator"
  },
  {
    "name": "Noise Exposure Calculator",
    "description": "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits",
    "href": "/noise-exposure-calculator"
  },
  {
    "name": "Noise Level Calculator",
    "description": "Noise Level Calculator – Combine Multiple Sound Sources",
    "href": "/noise-level-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Doppler Effect Calculator – Calculate Frequency Shift</h1>
        <p className="text-muted-foreground">Calculate the observed frequency shift due to relative motion between source and observer. Works for both sound and light waves.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
