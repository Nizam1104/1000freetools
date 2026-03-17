import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgToJpgConverter from "@/components/svg-tools/svg-to-jpg-converter";
import SvgToJpgConverterSeo from "@/components/seo-content/svg-tools/svg-to-jpg-converter";

export const metadata: Metadata = {
  title: `SVG to JPG Converter - Free Online Tool | 1000FreeTools`,
  description: `Convert SVG to JPG online for free. Control output quality, size, and background. Fast conversion with batch support. No installation.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-to-jpg-converter`,
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
    name: `SVG Viewer & Inspector`,
    description: `SVG Viewer & Code Inspector`,
    href: `/svg-tools/svg-viewer-inspector`,
  },
  {
    name: `SVG to PDF Converter`,
    description: `Convert SVG to PDF Online`,
    href: `/svg-tools/svg-to-pdf-converter`,
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

export default function SvgToJpgConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SVG to JPG Converter Online</h1>
        <p className="text-muted-foreground">
          Convert your SVG vector images to JPG format quickly. Adjust the
          quality and size to suit your needs. Perfect for sharing graphics on
          social media or websites.
        </p>
      </header>
      <div className="mt-8">
        <SvgToJpgConverter />
      </div>
      <div className="mt-8">
        <SvgToJpgConverterSeo />
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
