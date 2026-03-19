import type { Metadata } from "next";
import SvgComparisonDiffToolSeo from "@/components/seo-content/svg-tools/svg-comparison-diff-tool";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgComparisonDiffTool from "@/components/svg-tools/svg-comparison-diff-tool";

export const metadata: Metadata = {
  title: `SVG Comparison Tool - Diff SVG Files Visually & Code`,
  description: `Compare two SVG files online. Visual side-by-side view and XML code diff to identify changes. Free tool for developers and designers.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-comparison-diff-tool`,
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

export default function SvgComparisonDiffToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Compare Two SVG Files Online
        </h1>
        <p className="text-muted-foreground">
          Spot the differences between two SVG files. Compare them visually
          side-by-side and see a detailed diff of their XML code to understand
          exactly what changed.
        </p>
      </header>
      {<SvgComparisonDiffTool />}
      <div className="mt-16">
        <SvgComparisonDiffToolSeo />
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
