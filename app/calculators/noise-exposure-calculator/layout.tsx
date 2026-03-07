import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits",
  description: "Protect your hearing with our Noise Exposure Calculator. Enter noise level in dB            and daily exposure duration to calculate your noise dose and permissible exposure            time per OSHA and NIOSH standards — critical for workplace safety and hearing conservation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/noise-exposure-calculator",
  },
};

const tools = [
  {
    "name": "Noise Level Calculator",
    "description": "Noise Level Calculator – Combine Multiple Sound Sources",
    "href": "/calculators/noise-level-calculator"
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
