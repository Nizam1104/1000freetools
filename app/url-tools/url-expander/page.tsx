import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlExpander from "@/components/url-tools/url-expander";
import UrlExpanderSeo from "@/components/seo-content/url-tools/url-expander";

export const metadata: Metadata = {
  title: `Free URL Expander Tool | Unshorten Short Links`,
  description: `Safely expand shortened URLs to see their final destination. Avoid suspicious links and reveal the full URL behind bit.ly, t.co, and other shorteners.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-expander`,
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

export default function UrlExpanderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Expander: See Where Short Links Really Go
        </h1>
        <p className="text-muted-foreground">
          Unsure about a short link? Use our URL Expander to safely reveal the
          full, destination URL without clicking. Protect yourself from hidden
          redirects and see the true target of any shortened URL.
        </p>
      </header>
      <div className="mt-8">
        <UrlExpander />
      </div>
      <div className="mt-8">
        <UrlExpanderSeo />
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
