import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlSourceCodeViewer from "@/components/url-tools/url-source-code-viewer";
import UrlSourceCodeViewerSeo from "@/components/seo-content/url-tools/url-source-code-viewer";

export const metadata: Metadata = {
  title: `Free Page Source Viewer | View Website HTML Online`,
  description: `View the HTML source code of any website for free. Inspect page structure, meta tags, and scripts instantly. A handy tool for developers and SEOs.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-source-code-viewer`,
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

export default function UrlSourceCodeViewerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          View Page Source: See Any Website's HTML Code
        </h1>
        <p className="text-muted-foreground">
          View the complete HTML source code of any webpage with our free tool.
          Inspect meta tags, scripts, and structure without using browser
          developer tools. Enter a URL to see its raw source instantly.
        </p>
      </header>
      <div className="mt-8">
        <UrlSourceCodeViewer />
      </div>
      <div className="mt-8">
        <UrlSourceCodeViewerSeo />
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
