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
  title: "PCB Trace Width Calculator – Calculate Copper Trace Width",
  description: "Calculate minimum PCB trace width for a given current using IPC-2221 guidelines. Prevents overheating and ensures reliability.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pcb-trace-width-calculator",
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
    "name": "Series Parallel Resistor Calculator",
    "description": "Resistor Calculator – Series and Parallel Resistance Calculator",
    "href": "/calculators/series-parallel-resistor-calculator"
  },
  {
    "name": "Series Parallel Capacitor Calculator",
    "description": "Capacitor Calculator – Series and Parallel Capacitance Calculator",
    "href": "/calculators/series-parallel-capacitor-calculator"
  },
  {
    "name": "Inductor Calculations",
    "description": "Inductor Calculator – Inductance and Inductive Reactance Calculator",
    "href": "/calculators/inductor-calculations"
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
                    <BreadcrumbLink href="/calculators/pcb-trace-width-calculator">Pcb Trace Width Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">PCB Trace Width Calculator – Calculate Copper Trace Width</h1>
        <p className="text-muted-foreground">Calculate minimum PCB trace width for a given current using IPC-2221 guidelines. Prevents overheating and ensures reliability.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
