import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgToPngIconConverter from "@/components/icon-tools/svg-to-png-icon-converter";
import SvgToPngIconConverterSeo from "@/components/seo-content/icon-tools/svg-to-png-icon-converter";

export const metadata: Metadata = {
  title: `SVG to PNG Icon Converter | Free Online Tool`,
  description: `Convert SVG icons to PNG format online. Batch convert, set custom sizes, and keep transparency. Free tool for developers and designers.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/svg-to-png-icon-converter`,
  },
};

const tools = [
  {
    name: `Free Icon Maker Online`,
    description: `Create Custom Icons for Free`,
    href: `/icon-tools/free-icon-maker-online`,
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
    name: `Social Media Icon Pack Generator`,
    description: `Create Social Media Icon Packs`,
    href: `/icon-tools/social-media-icon-pack-generator`,
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

export default function SvgToPngIconConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert SVG Icons to PNG</h1>
        <p className="text-muted-foreground">
          Quickly turn your scalable vector icons into high-quality PNG images.
          Set exact dimensions, choose transparent backgrounds, and convert
          multiple files at once. Perfect for developers and designers.
        </p>
      </header>
      <div className="mt-8">
        <SvgToPngIconConverter />
      </div>
      <div className="mt-8">
        <SvgToPngIconConverterSeo />
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
