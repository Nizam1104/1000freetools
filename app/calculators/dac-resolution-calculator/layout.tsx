import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "DAC Resolution Calculator – Calculate DAC Output Step Size",
  description: "Calculate the resolution and output step size for a DAC based on bit depth and reference voltage.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dac-resolution-calculator",
  },
};

const tools = [
  {
    "name": "Adc Resolution Calculator",
    "description": "ADC Resolution Calculator – Calculate ADC LSB Size",
    "href": "/calculators/adc-resolution-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">DAC Resolution Calculator – Calculate DAC Output Step Size</h1>
        <p className="text-muted-foreground">Calculate the resolution and output step size for a DAC based on bit depth and reference voltage.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
