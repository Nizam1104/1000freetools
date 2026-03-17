import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { TextWatermarkAdder } from "@/components/text-tools/text-watermark-adder.tsx";

export const metadata: Metadata = {
  title: `Text Watermark Tool | Add Watermark to Images Online`,
  description: `Add custom text watermarks to your images online. Choose font, size, position, and opacity to protect your photos. Free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/text-watermark-adder`,
  },
};

const tools = [
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Tool for Designers`,
    href: `/typography-tools/font-pairing-tool`,
  },
  {
    name: `Letter Spacing Tool`,
    description: `Letter Spacing & Kerning Tool`,
    href: `/typography-tools/letter-spacing-tool`,
  },
  {
    name: `Line Height Generator`,
    description: `Line Height Calculator`,
    href: `/typography-tools/line-height-generator`,
  },
  {
    name: `Font Size Converter`,
    description: `Font Size Unit Converter`,
    href: `/typography-tools/font-size-converter`,
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

export default function TextWatermarkAdderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Add Text Watermark to Image</h1>
        <p className="text-muted-foreground">
          Protect your images by adding a text watermark. Upload a photo,
          customize the text, position, and opacity, then download the result.
        </p>
      </header>
      {<TextWatermarkAdder />}
      {/* TODO: add seo component for text-watermark-adder */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
