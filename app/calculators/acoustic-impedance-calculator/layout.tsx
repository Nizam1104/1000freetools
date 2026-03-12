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
  title: "Acoustic Impedance Calculator – Calculate Z",
  description: "Calculate the acoustic impedance of a material. Z = ρc where ρ is density and c is the speed of sound.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/acoustic-impedance-calculator",
  },
};

const tools = [
  {
    "name": "Audio Dynamic Range Calculator",
    "description": "Audio Dynamic Range Calculator – Calculate dB Dynamic Range of Audio Signals",
    "href": "/calculators/audio-dynamic-range-calculator"
  },
  {
    "name": "Db Calculator",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
    "href": "/calculators/db-calculator"
  },
  {
    "name": "Decibel To Power Converter",
    "description": "Decibel to Power Converter – Convert dB to Watts & Sound Pressure Level",
    "href": "/calculators/decibel-to-power-converter"
  },
  {
    "name": "Doppler Effect Calculator",
    "description": "Doppler Effect Calculator – Calculate Frequency Shift",
    "href": "/calculators/doppler-effect-calculator"
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
                    <BreadcrumbLink href="/calculators/acoustic-impedance-calculator">Acoustic Impedance Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Acoustic Impedance Calculator – Calculate Z</h1>
        <p className="text-muted-foreground">Calculate the acoustic impedance of a material. Z = ρc where ρ is density and c is the speed of sound.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
