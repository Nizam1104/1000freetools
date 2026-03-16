import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontSizeCalculator from "@/components/font-tools/font-size-calculator";
import FontSizeCalculatorSeo from "@/components/seo-content/font-tools/font-size-calculator";

export const metadata: Metadata = {
  title: `Font Size Calculator | PX to PT, EM, REM Converter`,
  description: `Calculate and convert font sizes between PX, PT, EM, REM. Essential tool for web developers and print designers. Free and accurate.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-size-calculator`,
  },
};

const tools = [
  {
    name: `Font Generator`,
    description: `Free Font Generator`,
    href: `/font-tools/font-generator`,
  },
  {
    name: `Font Identifier`,
    description: `What Font Is This?`,
    href: `/font-tools/font-identifier`,
  },
  {
    name: `Font Converter`,
    description: `Font File Converter`,
    href: `/font-tools/font-converter`,
  },
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Generator`,
    href: `/font-tools/font-pairing`,
  },
  {
    name: `Font Subsetter`,
    description: `Web Font Subsetter`,
    href: `/font-tools/font-subsetter`,
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

export default function FontSizeCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3"></h1>
        <p className="text-muted-foreground">
          Calculate perfect font sizes for any screen or print layout. Convert
          between pixels, points, ems, and rems with precision for responsive
          design.
        </p>
      </header>
      <div className="mt-8">
        <FontSizeCalculator />
      </div>
      <div className="mt-8">
        <FontSizeCalculatorSeo />
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
