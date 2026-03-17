import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgToPngConverter from "@/components/svg-tools/svg-to-png-converter";
import SvgToPngConverterSeo from "@/components/seo-content/svg-tools/svg-to-png-converter";

export const metadata: Metadata = {
  title: `SVG to PNG Converter Online - Free & Fast | 1000FreeTools`,
  description: `Convert SVG files to PNG images instantly. Free online tool with custom size, transparent background, and batch conversion. No registration needed.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-to-png-converter`,
  },
};

const tools = [
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
    name: `SVG to PDF Converter`,
    description: `Convert SVG to PDF Online`,
    href: `/svg-tools/svg-to-pdf-converter`,
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

export default function SvgToPngConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free SVG to PNG Converter</h1>
        <p className="text-muted-foreground">
          Need a PNG image from your SVG file? Convert SVG to PNG online for
          free. Set your exact dimensions and background, then download in one
          click. No software installation required.
        </p>
      </header>
      <div className="mt-8">
        <SvgToPngConverter />
      </div>
      <div className="mt-8">
        <SvgToPngConverterSeo />
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
