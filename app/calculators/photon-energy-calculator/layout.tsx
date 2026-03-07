import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Photon Energy Calculator – Calculate Energy of a Photon",
  description: "Calculate the energy of a photon from its wavelength or frequency. Our calculator provides results in Joules and electron-volts (eV).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/photon-energy-calculator",
  },
};

const tools = [
  {
    "name": "Relativistic Energy Calculator",
    "description": "Relativistic Energy Calculator – Special Relativity Calculator",
    "href": "/calculators/relativistic-energy-calculator"
  },
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/calculators/energy-calculator"
  },
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/calculators/wavelength-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/calculators/frequency-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/calculators/momentum-calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/calculators/kinetic-energy-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Photon Energy Calculator – Calculate Energy of a Photon</h1>
        <p className="text-muted-foreground">Calculate the energy of a photon from its wavelength or frequency. Our calculator provides results in Joules and electron-volts (eV).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
