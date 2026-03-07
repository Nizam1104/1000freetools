import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance",
  description: "Control your background blur with precision using our Depth-of-Field Calculator.            Enter aperture, focal length, and subject distance to calculate depth of field,            hyperfocal distance, and sharp zone limits — essential for portrait, landscape,            and macro photography.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/aperture-depth-of-field-calculator",
  },
};

const tools = [
  {
    "name": "Camera Exposure Calculator",
    "description": "Camera Exposure Calculator – Find the Perfect Aperture, Shutter Speed & ISO",
    "href": "/calculators/camera-exposure-calculator"
  },
  {
    "name": "Focal Length Calculator",
    "description": "Focal Length Calculator – Lensmaker's Equation",
    "href": "/calculators/focal-length-calculator"
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
