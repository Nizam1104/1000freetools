import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Base64ToSvgDecoder from "@/components/svg-tools/base64-to-svg-decoder";
import Base64ToSvgDecoderSeo from "@/components/seo-content/svg-tools/base64-to-svg-decoder";

export const metadata: Metadata = {
  title: `Base64 to SVG Decoder - Convert Data URI to SVG File`,
  description: `Decode Base64 data URIs back into SVG files online. Paste your string, preview the SVG, and download the file. Free conversion tool.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/base64-to-svg-decoder`,
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

export default function Base64ToSvgDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Base64 to SVG Decoder</h1>
        <p className="text-muted-foreground">
          Have a Base64 encoded SVG string? Decode it back into a standard SVG
          file. Preview the image and download it for editing or use.
        </p>
      </header>
      <div className="mt-8">
        <Base64ToSvgDecoder />
      </div>
      <div className="mt-8">
        <Base64ToSvgDecoderSeo />
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
