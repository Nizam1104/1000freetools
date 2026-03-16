import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Thermal Expansion Calculator | Linear & Volumetric Expansion`,
  description: `Free thermal expansion calculator. Find change in length, area, or volume due to temperature change. Engineering and materials science tool.`,
  alternates: {
    canonical: `https://1000freetools.com/physics-tools/thermal-expansion-calculator`,
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

export default function ThermalExpansionCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Thermal Expansion Calculator</h1>
        <p className="text-muted-foreground">See how heat changes size. Calculate how much a material expands or contracts when its temperature changes, for length, area, or volume.</p>
      </header>
      {/* TODO: add tool component for thermal-expansion-calculator */}
      {/* TODO: add seo component for thermal-expansion-calculator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
