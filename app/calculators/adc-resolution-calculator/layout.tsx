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
  title: "ADC Resolution Calculator – Calculate ADC LSB Size",
  description: "Calculate the resolution and number of levels for an ADC based on bit depth and reference voltage.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/adc-resolution-calculator",
  },
};

const tools = [
  {
    "name": "Dac Resolution Calculator",
    "description": "DAC Resolution Calculator – Calculate DAC Output Step Size",
    "href": "/calculators/dac-resolution-calculator"
  },
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/calculators/base-converter-calculator"
  },
  {
    "name": "Db Calculator",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
    "href": "/calculators/db-calculator"
  },
  {
    "name": "Pwm Frequency Calculator",
    "description": "PWM Frequency Calculator – Calculate PWM Output Frequency",
    "href": "/calculators/pwm-frequency-calculator"
  },
  {
    "name": "Rc Time Constant Calculator",
    "description": "RC Time Constant Calculator – Calculate RC Circuit Time Constant",
    "href": "/calculators/rc-time-constant-calculator"
  },
  {
    "name": "Rl Time Constant Calculator",
    "description": "RL Time Constant Calculator – Calculate RL Circuit Time Constant",
    "href": "/calculators/rl-time-constant-calculator"
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
                    <BreadcrumbLink href="/calculators/adc-resolution-calculator">Adc Resolution Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">ADC Resolution Calculator – Calculate ADC LSB Size</h1>
        <p className="text-muted-foreground">Calculate the resolution and number of levels for an ADC based on bit depth and reference voltage.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
