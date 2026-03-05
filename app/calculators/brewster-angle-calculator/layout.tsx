import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Brewster Angle Calculator – Polarization Angle Calculator",
  description: "Calculate Brewster's angle (polarization angle) for light passing between two media. At this angle, reflected light is completely polarized.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/brewster-angle-calculator",
  },
};

const tools = [
  {
    "name": "Refraction Index Calculator",
    "description": "Refraction Index Calculator – Calculate Refractive Index",
    "href": "/refraction-index-calculator"
  },
  {
    "name": "Snells Law Calculator",
    "description": "Snell's Law Calculator – Refraction Calculator",
    "href": "/snells-law-calculator"
  },
  {
    "name": "Lens Equation Calculator",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator",
    "href": "/lens-equation-calculator"
  },
  {
    "name": "Focal Length Calculator",
    "description": "Focal Length Calculator – Lensmaker's Equation",
    "href": "/focal-length-calculator"
  },
  {
    "name": "Aperture Depth Of Field Calculator",
    "description": "Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance",
    "href": "/aperture-depth-of-field-calculator"
  },
  {
    "name": "Perspective Angle Calculator",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
    "href": "/perspective-angle-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Brewster Angle Calculator – Polarization Angle Calculator</h1>
        <p className="text-muted-foreground">Calculate Brewster's angle (polarization angle) for light passing between two media. At this angle, reflected light is completely polarized.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
