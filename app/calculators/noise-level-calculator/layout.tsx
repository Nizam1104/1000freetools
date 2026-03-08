import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Noise Level Calculator – Combine Multiple Sound Sources",
  description: "Calculate the combined noise level from multiple sound sources. Our calculator adds decibels correctly and accounts for distance attenuation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/noise-level-calculator",
  },
};

const tools = [
  {
    "name": "Noise Exposure Calculator",
    "description": "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits",
    "href": "/calculators/noise-exposure-calculator"
  },
  {
    "name": "Db Calculator",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
    "href": "/calculators/db-calculator"
  },
  {
    "name": "Decibel To Power Converter",
    "description": "Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level",
    "href": "/calculators/decibel-to-power-converter"
  },
  {
    "name": "Audio Dynamic Range Calculator",
    "description": "Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals",
    "href": "/calculators/audio-dynamic-range-calculator"
  },
  {
    "name": "Acoustic Impedance Calculator",
    "description": "Acoustic Impedance Calculator – Calculate Z",
    "href": "/calculators/acoustic-impedance-calculator"
  },
  {
    "name": "Signal To Noise Ratio Calculator",
    "description": "Signal-to-Noise Ratio Calculator – Calculate SNR in dB",
    "href": "/calculators/signal-to-noise-ratio-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Noise Level Calculator – Combine Multiple Sound Sources</h1>
        <p className="text-muted-foreground">Calculate the combined noise level from multiple sound sources. Our calculator adds decibels correctly and accounts for distance attenuation.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
