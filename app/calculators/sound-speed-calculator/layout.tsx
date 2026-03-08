import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Sound Speed Calculator – Calculate Speed of Sound",
  description: "Calculate the speed of sound in various media. For air, enter temperature. For other media, use bulk modulus and density.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/sound-speed-calculator",
  },
};

const tools = [
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/calculators/wavelength-calculator"
  },
  {
    "name": "Doppler Effect Calculator",
    "description": "Doppler Effect Calculator – Calculate Frequency Shift",
    "href": "/calculators/doppler-effect-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/calculators/frequency-calculator"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/calculators/note-frequency-calculator"
  },
  {
    "name": "Acoustic Impedance Calculator",
    "description": "Acoustic Impedance Calculator – Calculate Z",
    "href": "/calculators/acoustic-impedance-calculator"
  },
  {
    "name": "Noise Exposure Calculator",
    "description": "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits",
    "href": "/calculators/noise-exposure-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Sound Speed Calculator – Calculate Speed of Sound</h1>
        <p className="text-muted-foreground">Calculate the speed of sound in various media. For air, enter temperature. For other media, use bulk modulus and density.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
