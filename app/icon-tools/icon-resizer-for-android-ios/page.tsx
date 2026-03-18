import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { IconResizerForAndroidIos } from "@/components/icon-tools/icon-resizer-for-android-ios.tsx";
import IconResizerForAndroidIosSeo from "@/components/seo-content/icon-tools/icon-resizer-for-android-ios";

export const metadata: Metadata = {
  title: `App Icon Resizer | Android & iOS Icon Sizes`,
  description: `Resize app icons for Android and iOS platforms. Free online tool with preset dimensions for all densities. Batch process and export.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/icon-resizer-for-android-ios`,
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

export default function IconResizerForAndroidIosPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Resize App Icons for Android and iOS</h1>
        <p className="text-muted-foreground">Prepare your app icons for publication with one click. Our tool resizes icons to all required dimensions for Google Play and the Apple App Store, saving you hours of manual work.</p>
      </header>
      {<IconResizerForAndroidIos />}
      <IconResizerForAndroidIosSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
