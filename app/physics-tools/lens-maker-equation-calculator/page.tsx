import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { LensMakerEquationCalculator } from "@/components/physics-tools/lens-maker-equation-calculator";
import LensMakerEquationCalculatorSeo from "@/components/seo-content/physics-tools/lens-maker-equation-calculator";

export const metadata: Metadata = {
  title: `Lens Maker Equation Calculator | Focal Length Solver`,
  description: `Free lens maker equation calculator. Find focal length from lens curvature and material. Perfect for optics and physics projects.`,
  alternates: {
    canonical: `https://1000freetools.com/physics-tools/lens-maker-equation-calculator`,
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
    name: `Doppler Effect Calculator`,
    description: `Doppler Effect Calculator`,
    href: `/physics-tools/doppler-effect-calculator`,
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

export default function LensMakerEquationCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Lens Maker Equation Calculator</h1>
        <p className="text-muted-foreground">Design and analyze simple lenses. Input the curvature of each surface, the material's refractive index, and thickness to find the focal length.</p>
      </header>
      <div className="mt-8">
        <LensMakerEquationCalculator />
      </div>
      <div className="mt-8">
        <LensMakerEquationCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
