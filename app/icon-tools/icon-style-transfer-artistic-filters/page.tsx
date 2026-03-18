import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { IconStyleTransferArtisticFilters } from "@/components/icon-tools/icon-style-transfer-artistic-filters.tsx";
import IconStyleTransferArtisticFiltersSeo from "@/components/seo-content/icon-tools/icon-style-transfer-artistic-filters";

export const metadata: Metadata = {
  title: `Icon Style Transfer | Apply Artistic Filters Online`,
  description: `Apply artistic styles and filters to icons. Neon, sketch, watercolor effects. Works on SVG and PNG icons. Free online style transfer.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/icon-style-transfer-artistic-filters`,
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

export default function IconStyleTransferArtisticFiltersPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Apply Artistic Styles to Icons</h1>
        <p className="text-muted-foreground">Transform your icons with artistic filters. Give them a neon glow, sketch effect, or watercolor look. Upload an icon, pick a style, and download the transformed version.</p>
      </header>
      {<IconStyleTransferArtisticFilters />}
      <IconStyleTransferArtisticFiltersSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
