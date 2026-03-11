import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import MaterialDesignIconFinder from "@/components/icon-tools/material-design-icon-finder";
import MaterialDesignIconFinderSeo from "@/components/seo-content/icon-tools/material-design-icon-finder";

export const metadata: Metadata = {
  title: `Material Design Icons | Free Icon Library`,
  description: `Browse and download Material Design icons. Search by name, filter by style, and customize color/size. Free SVG and PNG downloads.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/material-design-icon-finder`,
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

export default function MaterialDesignIconFinderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Find & Download Material Design Icons
        </h1>
        <p className="text-muted-foreground">
          Access the complete Material Design icon library. Search thousands of
          icons, customize their appearance, and download them ready to use in
          your project. Updated regularly.
        </p>
      </header>
      <div className="mt-8">
        <MaterialDesignIconFinder />
      </div>
      <div className="mt-8">
        <MaterialDesignIconFinderSeo />
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
