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
  title: "Frequency Calculator – Calculate Frequency from Period and More",
  description: "Calculate signal frequency, period, and angular frequency with our frequency calculator. Covers Hz to period conversions and is useful for electronics, physics, and audio.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/frequency-calculator",
  },
};

const tools = [
  {
    "name": "Wavelength Calculator",
    "description": "Wavelength Calculator – Calculate Wavelength from Frequency",
    "href": "/calculators/wavelength-calculator"
  },
  {
    "name": "Photon Energy Calculator",
    "description": "Photon Energy Calculator – Calculate Energy of a Photon",
    "href": "/calculators/photon-energy-calculator"
  },
  {
    "name": "Sound Speed Calculator",
    "description": "Sound Speed Calculator – Calculate Speed of Sound",
    "href": "/calculators/sound-speed-calculator"
  },
  {
    "name": "Doppler Effect Calculator",
    "description": "Doppler Effect Calculator – Calculate Frequency Shift",
    "href": "/calculators/doppler-effect-calculator"
  },
  {
    "name": "Note Frequency Calculator",
    "description": "Note Frequency Calculator – Find the Hz Frequency of Any Musical Note",
    "href": "/calculators/note-frequency-calculator"
  },
  {
    "name": "Pwm Frequency Calculator",
    "description": "PWM Frequency Calculator – Calculate PWM Output Frequency",
    "href": "/calculators/pwm-frequency-calculator"
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
                    <BreadcrumbLink href="/calculators/frequency-calculator">Frequency Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Frequency Calculator – Calculate Frequency from Period and More</h1>
        <p className="text-muted-foreground">Calculate signal frequency, period, and angular frequency with our frequency calculator. Covers Hz to period conversions and is useful for electronics, physics, and audio.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
