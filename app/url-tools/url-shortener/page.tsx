import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlShortener from "@/components/url-tools/url-shortener";
import UrlShortenerSeo from "@/components/seo-content/url-tools/url-shortener";

export const metadata: Metadata = {
  title: `Free URL Shortener | Shorten Long Links Online`,
  description: `Shorten long URLs quickly and for free. Create custom short links that are perfect for social media and marketing. No account required to start.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-shortener`,
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

export default function UrlShortenerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Shortener: Create Short, Clean Links Instantly
        </h1>
        <p className="text-muted-foreground">
          Shorten long, messy URLs into neat, shareable links with our free URL
          Shortener. Make your links more presentable for social media, emails,
          and print. Optionally create custom short URLs.
        </p>
      </header>
      <div className="mt-8">
        <UrlShortener />
      </div>
      <div className="mt-8">
        <UrlShortenerSeo />
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
