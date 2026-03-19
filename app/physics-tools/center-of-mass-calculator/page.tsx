import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CenterOfMassCalculator from "@/components/physics-tools/center-of-mass-calculator";
import CenterOfMassCalculatorSeo from "@/components/seo-content/physics-tools/center-of-mass-calculator";

export const metadata: Metadata = {
  title: `Center of Mass Calculator | Find Centroid of Point Masses`,
  description: `Free center of mass calculator for systems of point masses. Input mass and coordinates to find the centroid. Useful for physics and engineering.`,
  alternates: {
    canonical: `https://1000freetools.com/physics-tools/center-of-mass-calculator`,
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

export default function CenterOfMassCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Center of Mass Calculator</h1>
        <p className="text-muted-foreground">Find the balance point for any group of objects. Add masses and their positions to calculate the system's center of mass in one, two, or three dimensions.</p>
      </header>
      <div className="mt-8">
        <CenterOfMassCalculator />
      </div>
      <div className="mt-8">
        <CenterOfMassCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
