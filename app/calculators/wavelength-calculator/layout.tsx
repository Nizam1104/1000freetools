import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Wavelength Calculator – Calculate Wavelength from Frequency",
  description: "Find the wavelength of any wave using our wavelength calculator. Enter frequency and wave speed to calculate λ = v/f for electromagnetic, sound, or water waves.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wavelength-calculator",
  },
};

const tools = [
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/frequency-calculator"
  },
  {
    "name": "Photon Energy Calculator",
    "description": "Photon Energy Calculator – Calculate Energy of a Photon",
    "href": "/photon-energy-calculator"
  },
  {
    "name": "Doppler Effect Calculator",
    "description": "Doppler Effect Calculator – Calculate Frequency Shift",
    "href": "/doppler-effect-calculator"
  },
  {
    "name": "Sound Speed Calculator",
    "description": "Sound Speed Calculator – Calculate Speed of Sound",
    "href": "/sound-speed-calculator"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/note-frequency-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Wavelength Calculator – Calculate Wavelength from Frequency</h1>
        <p className="text-muted-foreground">Find the wavelength of any wave using our wavelength calculator. Enter frequency and wave speed to calculate λ = v/f for electromagnetic, sound, or water waves.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
