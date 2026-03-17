import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlToRssFeedConverter from "@/components/xml-tools/xml-to-rss-feed-converter";
import XmlToRssFeedConverterSeo from "@/components/seo-content/xml-tools/xml-to-rss-feed-converter";

export const metadata: Metadata = {
  title: `XML to RSS Converter | Create RSS Feed from XML Data`,
  description: `Convert XML to a valid RSS 2.0 feed. Map elements to title, link, description. Generate RSS for blogs or news. Free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/xml-to-rss-feed-converter`,
  },
};

const tools = [
  {
    name: `XML Formatter and Validator`,
    description: `Format and Validate Your XML Instantly`,
    href: `/xml-tools/xml-formatter-validator`,
  },
  {
    name: `XML to JSON Converter`,
    description: `Convert XML to JSON Online`,
    href: `/xml-tools/xml-to-json-converter`,
  },
  {
    name: `JSON to XML Converter`,
    description: `Convert JSON to XML in Seconds`,
    href: `/xml-tools/json-to-xml-converter`,
  },
  {
    name: `XML Minifier and Compressor`,
    description: `Minify and Compress XML Files`,
    href: ``,
  },
  {
    name: `XML Viewer and Editor`,
    description: `View and Edit XML Online`,
    href: `/xml-tools/xml-viewer-editor`,
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

export default function XmlToRssFeedConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert XML to RSS Feed</h1>
        <p className="text-muted-foreground">
          Turn any XML data source into a working RSS feed. Map your XML
          elements to standard RSS tags to create feeds compatible with readers
          and aggregators.
        </p>
      </header>
      <div className="mt-8">
        <XmlToRssFeedConverter />
      </div>
      <div className="mt-8">
        <XmlToRssFeedConverterSeo />
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
