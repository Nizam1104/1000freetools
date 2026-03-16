import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlSocialMediaPreview from "@/components/url-tools/url-social-media-preview";
import UrlSocialMediaPreviewSeo from "@/components/seo-content/url-tools/url-social-media-preview";

export const metadata: Metadata = {
  title: `Free Social Media Link Preview Tool | Check OG Tags`,
  description: `Preview how your links look on social media. Check Open Graph and Twitter Card tags for any URL to optimize sharing. Free and instant.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-social-media-preview`,
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

export default function UrlSocialMediaPreviewPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Social Media Preview Tool: See How Your Link Looks When Shared
        </h1>
        <p className="text-muted-foreground">
          Preview how any URL will appear on Facebook, Twitter, and other social
          networks. Our tool extracts Open Graph and Twitter Card data to show
          you the exact image, title, and description users will see.
        </p>
      </header>
      <div className="mt-8">
        <UrlSocialMediaPreview />
      </div>
      <div className="mt-8">
        <UrlSocialMediaPreviewSeo />
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
