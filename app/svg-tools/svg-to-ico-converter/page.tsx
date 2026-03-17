import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgToIcoConverter from "@/components/svg-tools/svg-to-ico-converter";
import SvgToIcoConverterSeo from "@/components/seo-content/svg-tools/svg-to-ico-converter";

export const metadata: Metadata = {
  title: `SVG to ICO Converter - Create Favicon from SVG Online`,
  description: `Convert SVG to ICO favicon online for free. Generate ICO files with multiple sizes (16x16, 32x32, etc.) from your vector logo. No software needed.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-to-ico-converter`,
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

export default function SvgToIcoConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SVG to ICO Favicon Converter
        </h1>
        <p className="text-muted-foreground">
          Convert your SVG logo into a professional ICO favicon file. Include
          multiple sizes (16x16 to 256x256) in one ICO for perfect display in
          browsers and on desktops.
        </p>
      </header>
      <div className="mt-8">
        <SvgToIcoConverter />
      </div>
      <div className="mt-8">
        <SvgToIcoConverterSeo />
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
