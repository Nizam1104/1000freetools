import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { IconSearchEngineDuplicateFinder } from "@/components/icon-tools/icon-search-engine-duplicate-finder.tsx";
import IconSearchEngineDuplicateFinderSeo from "@/components/seo-content/icon-tools/icon-search-engine-duplicate-finder";

export const metadata: Metadata = {
  title: `Icon Search Engine | Find & Remove Duplicate Icons`,
  description: `Search your icon collection visually and find duplicate files. Supports ICO, PNG, SVG. Free online organizer and duplicate finder.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/icon-search-engine-duplicate-finder`,
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

export default function IconSearchEngineDuplicateFinderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Search & Find Duplicate Icons</h1>
        <p className="text-muted-foreground">Organize your icon library. Find icons by looks or name, and identify duplicate files to free up space. Scan folders directly from your browser.</p>
      </header>
      {<IconSearchEngineDuplicateFinder />}
      <IconSearchEngineDuplicateFinderSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
