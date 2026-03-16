import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgPathEditorSimplifier from "@/components/svg-tools/svg-path-editor-simplifier";
import SvgPathEditorSimplifierSeo from "@/components/seo-content/svg-tools/svg-path-editor-simplifier";

export const metadata: Metadata = {
  title: `SVG Path Editor - Simplify & Edit Path Data Online`,
  description: `Edit and simplify SVG path data online. Visualize paths, reduce points for optimization, and convert command types. A free tool for developers and designers.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-path-editor-simplifier`,
  },
};

const tools = [
  {
    name: `SVG to PNG Converter`,
    description: `Free SVG to PNG Converter`,
    href: `/svg-tools/svg-to-png-converter`,
  },
  {
    name: `SVG Optimizer & Compressor`,
    description: `SVG Optimizer & Compressor`,
    href: `/svg-tools/svg-optimizer-compressor`,
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

export default function SvgPathEditorSimplifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SVG Path Data Editor & Simplifier
        </h1>
        <p className="text-muted-foreground">
          Edit and simplify complex SVG path data directly. Visualize changes in
          real-time, reduce points to optimize file size, or convert between
          relative and absolute commands.
        </p>
      </header>
      <div className="mt-8">
        <SvgPathEditorSimplifier />
      </div>
      <div className="mt-8">
        <SvgPathEditorSimplifierSeo />
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
