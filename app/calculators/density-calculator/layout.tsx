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
  title: "Density Calculator – Calculate Mass per Unit Volume",
  description: "Find the density of any object or substance by entering mass and volume. Calculator converts between units automatically and shows specific gravity for quick comparison.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/density-calculator",
  },
};

const tools = [
  {
    "name": "Mass Density Calculator",
    "description": "Mass Density Calculator",
    "href": "/calculators/mass-density-calculator"
  },
  {
    "name": "Specific Gravity Calculator",
    "description": "Specific Gravity Calculator",
    "href": "/calculators/specific-gravity-calculator"
  },
  {
    "name": "Volume Calculator",
    "description": "Volume Calculator",
    "href": "/calculators/volume-calculator"
  },
  {
    "name": "Weight Calculator",
    "description": "Weight Calculator",
    "href": "/calculators/weight-calculator"
  },
  {
    "name": "Buoyancy Calculator",
    "description": "Buoyancy Calculator",
    "href": "/calculators/buoyancy-calculator"
  },
  {
    "name": "Pressure Calculator",
    "description": "Pressure Calculator",
    "href": "/calculators/pressure-calculator"
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
              <BreadcrumbLink href="/calculators/density-calculator">Density Calculator</BreadcrumbLink>
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
