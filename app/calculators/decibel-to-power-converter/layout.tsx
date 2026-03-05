import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level",
  description: "Convert decibel levels to acoustic power and pressure measurements with our            dB to Power Converter. Enter dB value to calculate power ratio, sound intensity,            and SPL — essential for audio engineers, acousticians, and electronics designers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/decibel-to-power-converter",
  },
};

const tools = [
  {
    "name": "Db Calculator",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
    "href": "/db-calculator"
  },
  {
    "name": "Audio Dynamic Range Calculator",
    "description": "Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals",
    "href": "/audio-dynamic-range-calculator"
  },
  {
    "name": "Acoustic Impedance Calculator",
    "description": "Acoustic Impedance Calculator – Calculate Z",
    "href": "/acoustic-impedance-calculator"
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
  },
  {
    "name": "Signal To Noise Ratio Calculator",
    "description": "Signal-to-Noise Ratio Calculator – Calculate SNR in dB",
    "href": "/signal-to-noise-ratio-calculator"
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
