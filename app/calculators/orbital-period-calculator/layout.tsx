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
  title: "Orbital Period Calculator – Calculate Orbital Period",
  description: "Calculate the orbital period of a satellite or planet using Kepler's third law. Enter the semi-major axis and central body mass.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/orbital-period-calculator",
  },
};

const tools = [
  {
    "name": "Gravitational Field Calculator",
    "description": "Gravitational Field Calculator – Calculate Gravitational Field Strength",
    "href": "/calculators/gravitational-field-calculator"
  },
  {
    "name": "Gravitational Force Calculator",
    "description": "Gravitational Force Calculator – Newton's Law of Gravitation",
    "href": "/calculators/gravitational-force-calculator"
  },
  {
    "name": "Escape Velocity Calculator",
    "description": "Escape Velocity Calculator – Calculate Escape Velocity",
    "href": "/calculators/escape-velocity-calculator"
  },
  {
    "name": "Acceleration Calculator",
    "description": "Acceleration Calculator",
    "href": "/calculators/acceleration-calculator"
  },
  {
    "name": "Velocity Calculator",
    "description": "Velocity Calculator – Calculate Speed with Direction",
    "href": "/calculators/velocity-calculator"
  },
  {
    "name": "Momentum Calculator",
    "description": "Momentum Calculator",
    "href": "/calculators/momentum-calculator"
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
                    <BreadcrumbLink href="/calculators/orbital-period-calculator">Orbital Period Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Orbital Period Calculator – Calculate Orbital Period</h1>
        <p className="text-muted-foreground">Calculate the orbital period of a satellite or planet using Kepler's third law. Enter the semi-major axis and central body mass.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
