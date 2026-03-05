import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "ISO Noise Predictor – Estimate Image Noise Level for Any Camera ISO Setting",
  description: "Avoid grainy photos by knowing your camera's ISO limits with our ISO Noise Predictor. Enter your camera model's sensor size and ISO value to predict the expected noise level — helping photographers choose the best ISO for any lighting condition.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/iso-noise-predictor",
  },
};

const tools = [
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
    "name": "Shutter Speed Calculator",
    "description": "Shutter Speed Calculator – Find the Right Shutter Speed for Sharp or Blurred Shots",
    "href": "/shutter-speed-calculator"
  },
  {
    "name": "Focal Length Calculator",
    "description": "Focal Length Calculator – Lensmaker's Equation",
    "href": "/focal-length-calculator"
  },
  {
    "name": "Lens Equation Calculator",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator",
    "href": "/lens-equation-calculator"
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
