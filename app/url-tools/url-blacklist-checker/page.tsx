import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlBlacklistChecker from "@/components/url-tools/url-blacklist-checker";
import UrlBlacklistCheckerSeo from "@/components/seo-content/url-tools/url-blacklist-checker";

export const metadata: Metadata = {
  title: `Free Blacklist Checker | Check URL Safety Status`,
  description: `Check if a URL or domain is blacklisted for malware or spam. Free tool that scans Google Safe Browsing and other security databases instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-blacklist-checker`,
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

export default function UrlBlacklistCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          URL Blacklist Checker: Is Your Site Flagged as Unsafe?
        </h1>
        <p className="text-muted-foreground">
          Check if your website or any URL is blacklisted by security services.
          Our tool scans multiple databases for malware, phishing, and spam
          listings to help protect your reputation. Enter a domain to run a
          safety check.
        </p>
      </header>
      <div className="mt-8">
        <UrlBlacklistChecker />
      </div>
      <div className="mt-8">
        <UrlBlacklistCheckerSeo />
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
