import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Snell's Law Calculator – Refraction Calculator",
  description: "Calculate the angle of refraction using Snell's law. Our calculator also determines the critical angle for total internal reflection.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/snells-law-calculator",
  },
};

const tools = [
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
    "name": "Lens Equation Calculator",
    "description": "Lens Equation Calculator – Thin Lens Formula Calculator",
    "href": "/lens-equation-calculator"
  },
  {
    "name": "Mirror Equation Calculator",
    "description": "Mirror Equation Calculator – Spherical Mirror Formula",
    "href": "/mirror-equation-calculator"
  },
  {
    "name": "Focal Length Calculator",
    "description": "Focal Length Calculator – Lensmaker's Equation",
    "href": "/focal-length-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Snell's Law Calculator – Refraction Calculator</h1>
        <p className="text-muted-foreground">Calculate the angle of refraction using Snell's law. Our calculator also determines the critical angle for total internal reflection.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
