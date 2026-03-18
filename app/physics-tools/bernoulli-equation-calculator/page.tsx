import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { BernoulliEquationCalculator } from "@/components/physics-tools/bernoulli-equation-calculator";
import BernoulliEquationCalculatorSeo from "@/components/seo-content/physics-tools/bernoulli-equation-calculator";

export const metadata: Metadata = {
  title: `Bernoulli Equation Calculator | Fluid Dynamics Pressure Flow`,
  description: `Free Bernoulli equation calculator for ideal fluids. Relate pressure, velocity, and elevation along a streamline. Engineering and physics fluid mechanics.`,
  alternates: {
    canonical: `https://1000freetools.com/physics-tools/bernoulli-equation-calculator`,
  },
};

const tools = [
  {
    name: `Physics Calculator`,
    description: `Physics Calculator: Solve Equations Instantly`,
    href: `/physics-tools/physics-calculator`,
  },
  {
    name: `Projectile Motion Simulator`,
    description: `Projectile Motion Simulator`,
    href: `/physics-tools/projectile-motion-simulator`,
  },
  {
    name: `Ohm's Law Calculator`,
    description: `Ohm's Law Calculator`,
    href: `/physics-tools/ohms-law-calculator`,
  },
  {
    name: `Kinetic Energy Calculator`,
    description: `Kinetic Energy Calculator`,
    href: `/physics-tools/kinetic-energy-calculator`,
  },
  {
    name: `Lens Maker Equation Calculator`,
    description: `Lens Maker Equation Calculator`,
    href: `/physics-tools/lens-maker-equation-calculator`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function BernoulliEquationCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bernoulli Equation Calculator</h1>
        <p className="text-muted-foreground">Understand fluid dynamics. Use pressure, speed, and height at one point in a flow to find conditions at another, assuming ideal fluid behavior.</p>
      </header>
      <div className="mt-8">
        <BernoulliEquationCalculator />
      </div>
      <div className="mt-8">
        <BernoulliEquationCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
