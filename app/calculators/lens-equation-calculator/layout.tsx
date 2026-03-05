import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Lens Equation Calculator – Thin Lens Formula Calculator",
  description: "Calculate focal length, object distance, or image distance using the thin lens equation. Our calculator also determines magnification.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/lens-equation-calculator",
  },
};

const tools = [
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
    "name": "Camera Exposure Calculator",
    "description": "Camera Exposure Calculator – Find the Perfect Aperture, Shutter Speed & ISO",
    "href": "/camera-exposure-calculator"
  },
  {
    "name": "Brewster Angle Calculator",
    "description": "Brewster Angle Calculator – Polarization Angle Calculator",
    "href": "/brewster-angle-calculator"
  },
  {
    "name": "Refraction Index Calculator",
    "description": "Refraction Index Calculator – Calculate Refractive Index",
    "href": "/refraction-index-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Lens Equation Calculator – Thin Lens Formula Calculator</h1>
        <p className="text-muted-foreground">Calculate focal length, object distance, or image distance using the thin lens equation. Our calculator also determines magnification.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
