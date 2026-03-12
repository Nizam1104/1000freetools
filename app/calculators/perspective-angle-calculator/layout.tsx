import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
  description: "Master perspective drawing with our Perspective Angle Calculator. Input viewer            height and distance to calculate accurate vanishing point locations and            perspective angles for one-, two-, and three-point perspective — for artists,            architects, and illustrators.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/perspective-angle-calculator",
  },
};

const tools = [
  {
    "name": "Aperture Depth Of Field Calculator",
    "description": "Depth of Field Calculator – Calculate DOF from Aperture, Focal Length & Distance",
    "href": "/calculators/aperture-depth-of-field-calculator"
  },
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
    "name": "Lens Equation Calculator",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator",
    "href": "/calculators/lens-equation-calculator"
  },
  {
    "name": "Iso Noise Predictor",
    "description": "ISO Noise Predictor – Estimate Image Noise Level for Any Camera ISO Setting",
    "href": "/calculators/iso-noise-predictor"
  },
  {
    "name": "Brewster Angle Calculator",
    "description": "Brewster Angle Calculator – Polarization Angle Calculator",
    "href": "/calculators/brewster-angle-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/perspective-angle-calculator">Perspective Angle Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
