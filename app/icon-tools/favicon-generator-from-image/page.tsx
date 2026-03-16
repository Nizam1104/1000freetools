import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FaviconGeneratorFromImage from "@/components/icon-tools/favicon-generator-from-image";
import FaviconGeneratorFromImageSeo from "@/components/seo-content/icon-tools/favicon-generator-from-image";

export const metadata: Metadata = {
  title: `Favicon Generator | Create Favicon from Image Free`,
  description: `Generate a website favicon from any image. Free online tool creates ICO and PNG files in all standard sizes. Get HTML code for easy setup.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/favicon-generator-from-image`,
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

export default function FaviconGeneratorFromImagePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Generate a Favicon from Any Image
        </h1>
        <p className="text-muted-foreground">
          Upload a photo, logo, or graphic to create a professional favicon for
          your website. Our tool handles cropping and generates all necessary
          file sizes and formats instantly.
        </p>
      </header>
      <div className="mt-8">
        <FaviconGeneratorFromImage />
      </div>
      <div className="mt-8">
        <FaviconGeneratorFromImageSeo />
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
