import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import IconColorChanger from "@/components/icon-tools/icon-color-changer-palette-tool";
import IconColorChangerPaletteToolSeo from "@/components/seo-content/icon-tools/icon-color-changer-palette-tool";

export const metadata: Metadata = {
  title: `Icon Color Changer | Recolor Icons Online`,
  description: `Change colors of SVG and PNG icons online. Use color palettes or custom hex codes. Batch recolor icons to match your theme.`,
  alternates: {
    canonical: `https://1000freetools.com/icon-tools/icon-color-changer-palette-tool`,
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

export default function IconColorChangerPaletteToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Change Icon Colors Instantly
        </h1>
        <p className="text-muted-foreground">
          Modify the colors of your icons to fit any design scheme. Upload an
          icon, pick new colors from a palette or custom hex values, and
          download the updated version.
        </p>
      </header>
      <div className="mt-8">
        <IconColorChanger />
      </div>
      <div className="mt-8">
        <IconColorChangerPaletteToolSeo />
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
