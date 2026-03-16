import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlCanonicalizationChecker from "@/components/url-tools/url-canonicalization-checker";
import UrlCanonicalizationCheckerSeo from "@/components/seo-content/url-tools/url-canonicalization-checker";

export const metadata: Metadata = {
  title: `Free Canonical URL Checker | Check Canonical Tags`,
  description: `Check canonical URL tags on any webpage for free. Identify duplicate content issues and ensure search engines index the right page. Instant analysis.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-canonicalization-checker`,
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

export default function UrlCanonicalizationCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Canonical URL Checker: Find the Preferred Page Version
        </h1>
        <p className="text-muted-foreground">
          Check any webpage's canonical tag to see which URL search engines
          should treat as the main version. Our tool helps you fix duplicate
          content issues and improve SEO. Simply enter a URL to analyze its
          canonicalization.
        </p>
      </header>
      <div className="mt-8">
        <UrlCanonicalizationChecker />
      </div>
      <div className="mt-8">
        <UrlCanonicalizationCheckerSeo />
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
