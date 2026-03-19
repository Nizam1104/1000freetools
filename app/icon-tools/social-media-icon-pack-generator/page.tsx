import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SocialMediaIconPackGenerator from "@/components/icon-tools/social-media-icon-pack-generator";
import SocialMediaIconPackGeneratorSeo from "@/components/seo-content/icon-tools/social-media-icon-pack-generator";

export const metadata: Metadata = {
  title: `Social Media Icon Generator | Free Icon Pack`,
  description: `Generate matching social media icon sets for your website. Customize style and color. Download PNG and SVG icons for all platforms.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/social-media-icon-pack-generator`,
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

export default function SocialMediaIconPackGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Create Social Media Icon Packs</h1>
        <p className="text-muted-foreground">Design a matching set of social media icons for your website or app. Pick a style, customize the colors, and download all icons in one pack with multiple sizes included.</p>
      </header>
      {<SocialMediaIconPackGenerator />}
      <SocialMediaIconPackGeneratorSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
