import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlDecoder from "@/components/url-tools/url-decoder";
import UrlDecoderSeo from "@/components/seo-content/url-tools/url-decoder";

export const metadata: Metadata = {
  title: `Free URL Decoder Tool | Decode Encoded URLs Online`,
  description: `Quickly decode percent-encoded URLs to plain text with our free online decoder. Perfect for developers and SEOs. Instant results, no download needed.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-decoder`,
  },
};

const tools = [
  {
    name: `URL Encoder`,
    description: `URL Encoder: Encode Special Characters for Web URLs`,
    href: `/url-tools/url-encoder`,
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

export default function UrlDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Decoder: Decode Percent-Encoded URLs
        </h1>
        <p className="text-muted-foreground">
          Decode any encoded URL instantly with our free URL Decoder tool.
          Understand what's hidden behind the percent signs in web addresses.
          Simply paste the encoded URL and see the human-readable result.
        </p>
      </header>
      <div className="mt-8">
        <UrlDecoder />
      </div>
      <div className="mt-8">
        <UrlDecoderSeo />
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
