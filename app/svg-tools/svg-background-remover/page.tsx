import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgBackgroundRemover from "@/components/svg-tools/svg-background-remover";
import SvgBackgroundRemoverSeo from "@/components/seo-content/svg-tools/svg-background-remover";

export const metadata: Metadata = {
  title: `SVG Background Remover - Make SVG Transparent Online`,
  description: `Remove or change the background of SVG files online. Make SVG backgrounds transparent for logos and icons. Simple, free, and fast tool.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-background-remover`,
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

export default function SvgBackgroundRemoverPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Remove Background from SVG</h1>
        <p className="text-muted-foreground">
          Need a transparent background for your SVG logo? Upload your file, and
          our tool will help you identify and remove or change the background
          color in seconds.
        </p>
      </header>
      <div className="mt-8">
        <SvgBackgroundRemover />
      </div>
      <div className="mt-8">
        <SvgBackgroundRemoverSeo />
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
