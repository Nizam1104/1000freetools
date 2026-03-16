import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import IconFileFormatConverter from "@/components/icon-tools/icon-file-format-converter-all-types";
import IconFileFormatConverterAllTypesSeo from "@/components/seo-content/icon-tools/icon-file-format-converter-all-types";

export const metadata: Metadata = {
  title: `Icon Format Converter | Convert ICO, PNG, SVG, JPEG`,
  description: `Convert icon files between ICO, PNG, SVG, JPEG, and other formats. Batch conversion with quality control. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/icon-file-format-converter-all-types`,
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

export default function IconFileFormatConverterAllTypesPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert Icon Files Between Formats
        </h1>
        <p className="text-muted-foreground">
          Need an icon in a different format? Convert ICO to PNG, SVG to ICO,
          JPEG to PNG, and many more combinations. Process multiple files at
          once with custom settings.
        </p>
      </header>
      <div className="mt-8">
        <IconFileFormatConverter />
      </div>
      <div className="mt-8">
        <IconFileFormatConverterAllTypesSeo />
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
