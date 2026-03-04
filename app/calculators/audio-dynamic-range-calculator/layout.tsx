import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals",
  description: "Measure the dynamic range of your audio recordings with our Dynamic Range Calculator.            Enter peak level and noise floor in dB to calculate dynamic range — a key metric for            mastering engineers, sound designers, and audiophiles.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/audio-dynamic-range-calculator",
  },
};

const tools = [
  {
    "name": "Acoustic Impedance Calculator",
    "description": "Acoustic Impedance Calculator – Calculate Z",
    "href": "/acoustic-impedance-calculator"
  },
  {
    "name": "Db Calculator",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
    "href": "/db-calculator"
  },
  {
    "name": "Decibel To Power Converter",
    "description": "Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level",
    "href": "/decibel-to-power-converter"
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
