import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { AnimatedGifToIconConverter } from "@/components/icon-tools/animated-gif-to-icon-converter.tsx";
import AnimatedGifToIconConverterSeo from "@/components/seo-content/icon-tools/animated-gif-to-icon-converter";

export const metadata: Metadata = {
  title: `Animated GIF to Icon Converter | Free Tool`,
  description: `Convert animated GIFs to animated ICO or CUR files for Windows. Control animation speed and preview. Free online converter.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/animated-gif-to-icon-converter`,
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

export default function AnimatedGifToIconConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert Animated GIFs to Icons</h1>
        <p className="text-muted-foreground">Turn your animated GIFs into animated Windows icons or cursors. Adjust speed, preview the animation, and create unique dynamic icons for your desktop or applications.</p>
      </header>
      {<AnimatedGifToIconConverter />}
      <AnimatedGifToIconConverterSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
