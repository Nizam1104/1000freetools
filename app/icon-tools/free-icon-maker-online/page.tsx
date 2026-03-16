import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Free Icon Maker Online | Create Custom Icons`,
  description: `Design and download custom icons for apps, websites, and social media. Free online icon maker with SVG, PNG, and ICO export. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/free-icon-maker-online`,
  },
};

const tools = [
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

export default function FreeIconMakerOnlinePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Create Custom Icons for Free</h1>
        <p className="text-muted-foreground">Design unique icons in minutes with our free online editor. No design skills needed—use our templates and tools to create perfect icons for your project. Download in SVG, PNG, or ICO formats.</p>
      </header>
      {/* TODO: add tool component for free-icon-maker-online */}
      {/* TODO: add seo component for free-icon-maker-online */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
