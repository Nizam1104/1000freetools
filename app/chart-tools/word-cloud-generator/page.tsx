import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import WordCloudGenerator from "@/components/chart-tools/word-cloud-generator";
import WordCloudGeneratorSeo from "@/components/seo-content/chart-tools/word-cloud-generator";

export const metadata: Metadata = {
  title: `Free Word Cloud Generator | Create Word Clouds`,
  description: `Create custom word clouds online for free. Paste text, customize fonts, colors, and shapes. Download as PNG or SVG image instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/chart-tools/word-cloud-generator`,
  },
};

const tools = [
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
  {
    name: `Bar Graph Generator`,
    description: `Bar Graph Generator & Maker`,
    href: `/chart-tools/bar-graph-generator`,
  },
  {
    name: `Line Chart Creator`,
    description: `Line Chart Creator Online`,
    href: `/chart-tools/line-chart-creator`,
  },
  {
    name: `Scatter Plot Tool`,
    description: `Scatter Plot Maker & Generator`,
    href: `/chart-tools/scatter-plot-tool`,
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
    name: `CRON Expression Generator`,
    description: `Free CRON Expression Generator`,
    href: `/cron-expression-tools/cron-expression-generator`,
  },
];

export default function WordCloudGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Word Cloud Maker Online</h1>
        <p className="text-muted-foreground">
          Generate beautiful word clouds from any text. Highlight the most
          frequent words with customizable fonts, colors, and shapes.
        </p>
      </header>
      <div className="mt-8">
        <WordCloudGenerator />
      </div>
      <div className="mt-8">
        <WordCloudGeneratorSeo />
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
