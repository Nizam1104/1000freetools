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
  title: "Doppler Effect Calculator – Calculate Frequency Shift",
  description: "Calculate the observed frequency shift due to relative motion between source and observer. Works for both sound and light waves.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/doppler-effect-calculator",
  },
};

const tools = [
  {
    "name": "Acoustic Impedance Calculator",
    "description": "Acoustic Impedance Calculator – Calculate Z",
    "href": "/calculators/acoustic-impedance-calculator"
  },
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/calculators/wavelength-calculator"
  },
  {
    "name": "Frequency Calculator",
    "description": "Frequency Calculator – Calculate Frequency from Period and More",
    "href": "/calculators/frequency-calculator"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/calculators/note-frequency-calculator"
  },
  {
    "name": "Noise Exposure Calculator",
    "description": "Noise Exposure Calculator – Calculate Safe Noise Levels & Exposure Time Limits",
    "href": "/calculators/noise-exposure-calculator"
  },
  {
    "name": "Noise Level Calculator",
    "description": "Noise Level Calculator – Combine Multiple Sound Sources",
    "href": "/calculators/noise-level-calculator"
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
                    <BreadcrumbLink href="/calculators/doppler-effect-calculator">Doppler Effect Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Doppler Effect Calculator – Calculate Frequency Shift</h1>
        <p className="text-muted-foreground">Calculate the observed frequency shift due to relative motion between source and observer. Works for both sound and light waves.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
