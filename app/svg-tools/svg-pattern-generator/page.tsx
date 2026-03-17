import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgPatternGenerator from "@/components/svg-tools/svg-pattern-generator";
import SvgPatternGeneratorSeo from "@/components/seo-content/svg-tools/svg-pattern-generator";

export const metadata: Metadata = {
  title: `SVG Pattern Generator - Create Pattern Fills Online`,
  description: `Generate SVG pattern definitions online. Create stripes, dots, grids, and more. Customize and export SVG code for use as fills. Free design tool.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-pattern-generator`,
  },
};

const tools = [
  {
    name: `SVG to PNG Converter`,
    description: `Free SVG to PNG Converter`,
    href: `/svg-tools/svg-to-png-converter`,
  },
  {
    name: `SVG Editor Online`,
    description: `Free Online SVG Editor`,
    href: `/svg-tools/svg-editor-online`,
  },
  {
    name: `SVG to JPG Converter`,
    description: `SVG to JPG Converter Online`,
    href: `/svg-tools/svg-to-jpg-converter`,
  },
  {
    name: `SVG Viewer & Inspector`,
    description: `SVG Viewer & Code Inspector`,
    href: `/svg-tools/svg-viewer-inspector`,
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

export default function SvgPatternGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SVG Pattern Generator</h1>
        <p className="text-muted-foreground">
          Generate seamless SVG patterns like stripes, dots, and grids.
          Customize colors, spacing, and size, then get the SVG code to use as a
          fill in your designs.
        </p>
      </header>
      <div className="mt-8">
        <SvgPatternGenerator />
      </div>
      <div className="mt-8">
        <SvgPatternGeneratorSeo />
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
