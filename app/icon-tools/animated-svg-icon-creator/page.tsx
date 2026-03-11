import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AnimatedSvgIconCreator from "@/components/icon-tools/animated-svg-icon-creator";
import AnimatedSvgIconCreatorSeo from "@/components/seo-content/icon-tools/animated-svg-icon-creator";

export const metadata: Metadata = {
  title: `Animated SVG Icon Maker | Free Online Tool`,
  description: `Create animated SVG icons with CSS or SMIL. Use pre-built effects or custom animations. Export code for web projects. Free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/animated-svg-icon-creator`,
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

export default function AnimatedSvgIconCreatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Create Animated SVG Icons</h1>
        <p className="text-muted-foreground">
          Design engaging animated icons for your website or app. Choose from
          motion effects or create custom animations, then export the SVG code
          ready to embed.
        </p>
      </header>
      <div className="mt-8">
        <AnimatedSvgIconCreator />
      </div>
      <div className="mt-8">
        <AnimatedSvgIconCreatorSeo />
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
