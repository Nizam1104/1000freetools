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
  title: "Wire Gauge Calculator – Calculate Required Wire Size",
  description: "Determine the appropriate wire gauge for your electrical project. Our calculator considers current, length, voltage, and acceptable voltage drop to recommend the right AWG size.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wire-gauge-calculator",
  },
};

const tools = [
  {
    "name": "Led Resistor Calculator",
    "description": "LED Resistor Calculator – Calculate Current Limiting Resistor",
    "href": "/calculators/led-resistor-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Resistance Calculator",
    "description": "Resistance Calculator – Calculate Resistance with Ohm's Law",
    "href": "/calculators/resistance-calculator"
  },
  {
    "name": "Pcb Trace Width Calculator",
    "description": "PCB Trace Width Calculator – Calculate Copper Trace Width",
    "href": "/calculators/pcb-trace-width-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
  },
  {
    "name": "Series Parallel Resistor Calculator",
    "description": "Resistor Calculator – Series and Parallel Resistance Calculator",
    "href": "/calculators/series-parallel-resistor-calculator"
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
                    <BreadcrumbLink href="/calculators/wire-gauge-calculator">Wire Gauge Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Wire Gauge Calculator – Calculate Required Wire Size</h1>
        <p className="text-muted-foreground">Determine the appropriate wire gauge for your electrical project. Our calculator considers current, length, voltage, and acceptable voltage drop to recommend the right AWG size.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
