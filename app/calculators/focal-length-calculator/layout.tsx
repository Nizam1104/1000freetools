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
  title: "Focal Length Calculator – Lensmaker's Equation",
  description: "Calculate the focal length of a lens using the lensmaker's equation. Enter refractive index and radii of curvature.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/focal-length-calculator",
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
    "name": "Lens Equation Calculator",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator",
    "href": "/calculators/lens-equation-calculator"
  },
  {
    "name": "Perspective Angle Calculator",
    "description": "Perspective Angle Calculator – Calculate Vanishing Points for Technical Drawing",
    "href": "/calculators/perspective-angle-calculator"
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
                    <BreadcrumbLink href="/calculators/focal-length-calculator">Focal Length Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Focal Length Calculator – Lensmaker's Equation</h1>
        <p className="text-muted-foreground">Calculate the focal length of a lens using the lensmaker's equation. Enter refractive index and radii of curvature.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
