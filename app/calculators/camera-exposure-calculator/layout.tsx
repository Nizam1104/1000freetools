import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Camera Exposure Calculator – Find the Perfect Aperture, Shutter Speed & ISO",
  description: "Get perfectly exposed photos every time with our Camera Exposure Calculator.            Input your current exposure settings to calculate EV and find equivalent            exposures — ideal for photographers learning manual mode.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/camera-exposure-calculator",
  },
};

const tools = [
  {
    "name": "Aperture Depth Of Field Calculator",
    "description": "Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance",
    "href": "/calculators/aperture-depth-of-field-calculator"
  },
  {
    "name": "Iso Noise Predictor",
    "description": "ISO Noise Predictor – Estimate Image Noise Level for Any Camera ISO Setting",
    "href": "/calculators/iso-noise-predictor"
  },
  {
    "name": "Shutter Speed Calculator",
    "description": "Shutter Speed Calculator – Find the Right Shutter Speed for Sharp or Blurred Shots",
    "href": "/calculators/shutter-speed-calculator"
  },
  {
    "name": "Lens Equation Calculator",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator",
    "href": "/calculators/lens-equation-calculator"
  },
  {
    "name": "Focal Length Calculator",
    "description": "Focal Length Calculator – Lensmaker's Equation",
    "href": "/calculators/focal-length-calculator"
  },
  {
    "name": "Perspective Angle Calculator",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
    "href": "/calculators/perspective-angle-calculator"
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
