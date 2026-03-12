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
  title: "Mirror Equation Calculator – Spherical Mirror Formula",
  description: "Calculate focal length, object distance, or image distance for spherical mirrors. Our calculator works for both concave and convex mirrors.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mirror-equation-calculator",
  },
};

const tools = [
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
    "name": "Brewster Angle Calculator",
    "description": "Brewster Angle Calculator – Polarization Angle Calculator",
    "href": "/calculators/brewster-angle-calculator"
  },
  {
    "name": "Refraction Index Calculator",
    "description": "Refraction Index Calculator – Calculate Refractive Index",
    "href": "/calculators/refraction-index-calculator"
  },
  {
    "name": "Snells Law Calculator",
    "description": "Snell's Law Calculator – Refraction Calculator",
    "href": "/calculators/snells-law-calculator"
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
                    <BreadcrumbLink href="/calculators/mirror-equation-calculator">Mirror Equation Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Mirror Equation Calculator – Spherical Mirror Formula</h1>
        <p className="text-muted-foreground">Calculate focal length, object distance, or image distance for spherical mirrors. Our calculator works for both concave and convex mirrors.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
