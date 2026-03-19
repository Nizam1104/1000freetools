import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import VectorIconTracerImageToSvg from "@/components/icon-tools/vector-icon-tracer-image-to-svg";
import VectorIconTracerImageToSvgSeo from "@/components/seo-content/icon-tools/vector-icon-tracer-image-to-svg";

export const metadata: Metadata = {
  title: `Image to SVG Icon Converter | Vector Tracer`,
  description: `Convert JPEG/PNG images to SVG vector icons online. Auto-trace with manual editing. Create scalable icons from any image.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/vector-icon-tracer-image-to-svg`,
  },
};

const tools = [
  {
    name: `Free Icon Maker Online`,
    description: `Create Custom Icons for Free`,
    href: `/icon-tools/free-icon-maker-online`,
  },
  {
    name: `SVG to PNG Icon Converter`,
    description: `Convert SVG Icons to PNG`,
    href: `/icon-tools/svg-to-png-icon-converter`,
  },
  {
    name: `Favicon Generator from Image`,
    description: `Generate a Favicon from Any Image`,
    href: `/icon-tools/favicon-generator-from-image`,
  },
  {
    name: `Icon Resizer for Android & iOS`,
    description: `Resize App Icons for Android and iOS`,
    href: `/icon-tools/icon-resizer-for-android-ios`,
  },
  {
    name: `Material Design Icon Finder`,
    description: `Find & Download Material Design Icons`,
    href: `/icon-tools/material-design-icon-finder`,
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

export default function VectorIconTracerImageToSvgPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert Images to Vector Icons</h1>
        <p className="text-muted-foreground">Turn any logo or simple image into a crisp, scalable SVG icon. Use auto-trace or draw over the image to create clean vector paths perfect for resizing.</p>
      </header>
      {<VectorIconTracerImageToSvg />}
      <VectorIconTracerImageToSvgSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
