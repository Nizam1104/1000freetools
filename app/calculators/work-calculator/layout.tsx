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
  title: "Work Calculator",
  description: "Calculate mechanical work done. Enter force and distance, with an optional angle for W = Fd cos(θ).",
  alternates: {
    canonical: "https://1000freetools.com/calculators/work-calculator",
  },
};

const tools = [
  {
    "name": "Energy Calculator",
    "description": "Energy Calculator",
    "href": "/calculators/energy-calculator"
  },
  {
    "name": "Potential Energy Calculator",
    "description": "Potential Energy Calculator",
    "href": "/calculators/potential-energy-calculator"
  },
  {
    "name": "Kinetic Energy Calculator",
    "description": "Kinetic Energy Calculator – Calculate Energy of Motion",
    "href": "/calculators/kinetic-energy-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/calculators/momentum-calculator"
  },
  {
    "name": "Velocity Calculator",
    "description": "Velocity Calculator – Calculate Speed with Direction",
    "href": "/calculators/velocity-calculator"
  },
  {
    "name": "Spring Force Hookes Law Calculator",
    "description": "Hooke's Law Calculator – Spring Force and Displacement",
    "href": "/calculators/spring-force-hookes-law-calculator"
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
                    <BreadcrumbLink href="/calculators/work-calculator">Work Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Work Calculator</h1>
        <p className="text-muted-foreground">Calculate mechanical work done. Enter force and distance, with an optional angle for W = Fd cos(θ).</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
