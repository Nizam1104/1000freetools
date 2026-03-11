import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlEncoder from "@/components/url-tools/url-encoder";
import UrlEncoderSeo from "@/components/seo-content/url-tools/url-encoder";

export const metadata: Metadata = {
  title: `Free URL Encoder Online | Encode URL Characters`,
  description: `Encode special characters in URLs instantly with our free online URL Encoder. Make your web links safe and functional. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-encoder`,
  },
};

const tools = [
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

export default function UrlEncoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Encoder: Encode Special Characters for Web URLs
        </h1>
        <p className="text-muted-foreground">
          Use our free URL Encoder to safely convert text for use in web
          addresses. It ensures your URLs are correctly formatted and work
          across all browsers and servers. Paste your text and get the encoded
          result instantly.
        </p>
      </header>
      <div className="mt-8">
        <UrlEncoder />
      </div>
      <div className="mt-8">
        <UrlEncoderSeo />
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
