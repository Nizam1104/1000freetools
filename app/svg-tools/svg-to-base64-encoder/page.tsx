import type { Metadata } from "next";
import SvgToBase64EncoderSeo from "@/components/seo-content/svg-tools/svg-to-base64-encoder";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { SvgToBase64Encoder } from "@/components/svg-tools/svg-to-base64-encoder.tsx";

export const metadata: Metadata = {
  title: `SVG to Base64 Encoder - Free Online Converter`,
  description: `Encode SVG files to Base64 data URIs online. Copy the string for CSS/HTML embedding. Includes minification option. Fast and free.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-to-base64-encoder`,
  },
};

const tools = [
  {
    name: `SVG to PNG Converter`,
    description: `Free SVG to PNG Converter`,
    href: `/svg-tools/svg-to-png-converter`,
  },
  {
    name: `SVG Editor Online`,
    description: `Free Online SVG Editor`,
    href: `/svg-tools/svg-editor-online`,
  },
  {
    name: `SVG to JPG Converter`,
    description: `SVG to JPG Converter Online`,
    href: `/svg-tools/svg-to-jpg-converter`,
  },
  {
    name: `SVG Viewer & Inspector`,
    description: `SVG Viewer & Code Inspector`,
    href: `/svg-tools/svg-viewer-inspector`,
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

export default function SvgToBase64EncoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SVG to Base64 Encoder</h1>
        <p className="text-muted-foreground">
          Encode your SVG file to a Base64 data URI instantly. Get the string
          ready to embed directly in your CSS or HTML, reducing HTTP requests.
        </p>
      </header>
      {<SvgToBase64Encoder />}
      <div className="mt-16">
        <SvgToBase64EncoderSeo />
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
