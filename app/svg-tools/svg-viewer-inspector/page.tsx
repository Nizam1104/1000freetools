import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SvgViewerInspector from "@/components/svg-tools/svg-viewer-inspector";
import SvgViewerInspectorSeo from "@/components/seo-content/svg-tools/svg-viewer-inspector";

export const metadata: Metadata = {
  title: `SVG Viewer & Inspector - Explore SVG Structure Online`,
  description: `View SVG files and inspect their XML code structure interactively. Highlight elements, view attributes, and understand how SVGs are built. Free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/svg-viewer-inspector`,
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

export default function SvgViewerInspectorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SVG Viewer & Code Inspector</h1>
        <p className="text-muted-foreground">
          Upload any SVG to view it and explore its code structure. Click on
          elements in the visual to see their corresponding code, perfect for
          debugging or learning SVG.
        </p>
      </header>
      <div className="mt-8">
        <SvgViewerInspector />
      </div>
      <div className="mt-8">
        <SvgViewerInspectorSeo />
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
