import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import OhmsLawCalculator from "@/components/physics-tools/ohms-law-calculator";
import OhmsLawCalculatorSeo from "@/components/seo-content/physics-tools/ohms-law-calculator";

export const metadata: Metadata = {
  title: `Ohm's Law Calculator | Free Voltage Current Resistance`,
  description: `Free Ohm's Law calculator. Find voltage, current, resistance, or power instantly. Essential tool for electronics beginners and students.`,
  alternates: {
    canonical: `https://1000freetools.com/physics-tools/ohms-law-calculator`,
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

export default function OhmsLawCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Ohm's Law Calculator</h1>
        <p className="text-muted-foreground">
          Quickly calculate voltage, current, resistance, or power in any
          electrical circuit. Just enter two known values and get instant
          results.
        </p>
      </header>
      <div className="mt-8">
        <OhmsLawCalculator />
      </div>
      <div className="mt-8">
        <OhmsLawCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
