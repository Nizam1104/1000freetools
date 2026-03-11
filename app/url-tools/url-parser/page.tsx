import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlParser from "@/components/url-tools/url-parser";
import UrlParserSeo from "@/components/seo-content/url-tools/url-parser";

export const metadata: Metadata = {
  title: `Free URL Parser Online | Analyze URL Structure`,
  description: `Parse and analyze any URL's structure with our free tool. See protocol, domain, path, and parameters broken down clearly. Essential for webmasters.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-parser`,
  },
};

const tools = [
  {
    name: `URL Encoder`,
    description: `URL Encoder: Encode Special Characters for Web URLs`,
    href: `/url-tools/url-encoder`,
  },
  {
    name: `URL Decoder`,
    description: `URL Decoder: Decode Percent-Encoded URLs`,
    href: `/url-tools/url-decoder`,
  },
  {
    name: `URL Shortener`,
    description: `URL Shortener: Create Short, Clean Links Instantly`,
    href: `/url-tools/url-shortener`,
  },
  {
    name: `URL Expander`,
    description: `URL Expander: See Where Short Links Really Go`,
    href: `/url-tools/url-expander`,
  },
  {
    name: `URL Query String Extractor`,
    description: `URL Query String Extractor: Get Parameters from URLs`,
    href: `/url-tools/url-query-string-extractor`,
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

export default function UrlParserPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Parser: Analyze and Break Down Any Web Address
        </h1>
        <p className="text-muted-foreground">
          Parse any URL to see its individual components like domain, path, and
          query parameters. Our free URL Parser provides a clear, visual
          breakdown to help with development and SEO tasks. Input a URL and get
          an instant analysis.
        </p>
      </header>
      <div className="mt-8">
        <UrlParser />
      </div>
      <div className="mt-8">
        <UrlParserSeo />
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
