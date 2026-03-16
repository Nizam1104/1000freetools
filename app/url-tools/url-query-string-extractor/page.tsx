import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlQueryQueryStringExtractor from "@/components/url-tools/url-query-string-extractor";
import UrlQueryStringExtractorSeo from "@/components/seo-content/url-tools/url-query-string-extractor";

export const metadata: Metadata = {
  title: `Free Query String Extractor | Parse URL Parameters`,
  description: `Extract and analyze query parameters from any URL instantly. See UTM tags, IDs, and other data in a clear format. A must-have for marketers and developers.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-query-string-extractor`,
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
    name: `URL Parser`,
    description: `URL Parser: Analyze and Break Down Any Web Address`,
    href: `/url-tools/url-parser`,
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

export default function UrlQueryStringExtractorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Query String Extractor: Get Parameters from URLs
        </h1>
        <p className="text-muted-foreground">
          Extract and view all query parameters from any URL with our free tool.
          Easily see UTM tags, session IDs, and other tracking data embedded in
          web addresses. Paste a URL to get a clean breakdown of its query
          string.
        </p>
      </header>
      <div className="mt-8">
        <UrlQueryQueryStringExtractor />
      </div>
      <div className="mt-8">
        <UrlQueryStringExtractorSeo />
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
