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
  title: "RMS Value Calculator – Calculate Root Mean Square Voltage",
  description: "Calculate RMS voltage for different waveforms. RMS is the effective DC-equivalent voltage for AC signals.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rms-value-calculator",
  },
};

const tools = [
  {
    "name": "Peak To Peak Voltage Calculator",
    "description": "Peak-to-Peak Voltage Calculator – Convert AC Voltage Measurements",
    "href": "/calculators/peak-to-peak-voltage-calculator"
  },
  {
    "name": "Voltage Calculator",
    "description": "Voltage Calculator",
    "href": "/calculators/voltage-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/calculators/electric-power-calculator"
  },
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/calculators/ac-impedance-calculator"
  },
  {
    "name": "Current Calculator",
    "description": "Current Calculator – Calculate Electrical Current (Amps)",
    "href": "/calculators/current-calculator"
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
                    <BreadcrumbLink href="/calculators/rms-value-calculator">Rms Value Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">RMS Value Calculator – Calculate Root Mean Square Voltage</h1>
        <p className="text-muted-foreground">Calculate RMS voltage for different waveforms. RMS is the effective DC-equivalent voltage for AC signals.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
