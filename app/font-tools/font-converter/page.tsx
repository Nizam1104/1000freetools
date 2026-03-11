import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontConverter from "@/components/font-tools/font-converter";
import FontConverterSeo from "@/components/seo-content/font-tools/font-converter";

export const metadata: Metadata = {
  title: `Font Converter | Convert TTF, OTF, WOFF Online`,
  description: `Free online font converter. Change font formats like TTF to WOFF, OTF to SVG. Batch convert and optimize for web. No installation.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-converter`,
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
    name: `Font Pairing Tool`,
    description: `Font Pairing Generator`,
    href: `/font-tools/font-pairing`,
  },
  {
    name: `Font Size Calculator`,
    description: ``,
    href: `/font-tools/font-size-calculator`,
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

export default function FontConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Font File Converter</h1>
        <p className="text-muted-foreground">
          Convert TTF to WOFF, OTF to SVG, and more. Our free tool handles batch
          conversions and optimizes fonts for web use.
        </p>
      </header>
      <div className="mt-8">
        <FontConverter />
      </div>
      <div className="mt-8">
        <FontConverterSeo />
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
