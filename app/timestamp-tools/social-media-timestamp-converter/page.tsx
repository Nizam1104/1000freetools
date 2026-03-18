import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { SocialMediaTimestampConverter } from "@/components/timestamp-tools/social-media-timestamp-converter.tsx";
import SocialMediaTimestampConverterSeo from "@/components/seo-content/timestamp-tools/social-media-timestamp-converter";

export const metadata: Metadata = {
  title: `Social Media Timestamp Converter | FB, Twitter ID Decoder`,
  description: `Extract and convert timestamps from Facebook and Twitter IDs. Decode fbid and Snowflake timestamps to readable dates. Free online decoder.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/social-media-timestamp-converter`,
  },
};

const tools = [
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Epoch Timestamp Generator`,
    description: `Epoch Timestamp Generator`,
    href: `/timestamp-tools/epoch-timestamp-generator`,
  },
  {
    name: `Human Date to Timestamp`,
    description: `Human Date to Timestamp Converter`,
    href: `/timestamp-tools/human-date-to-timestamp`,
  },
  {
    name: `Timestamp to Readable Date`,
    description: `Timestamp to Human Readable Date`,
    href: `/timestamp-tools/timestamp-to-readable-date`,
  },
  {
    name: `Current Unix Timestamp`,
    description: `Current Unix Timestamp`,
    href: `/timestamp-tools/current-unix-timestamp`,
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

export default function SocialMediaTimestampConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Social Media Timestamp Converter</h1>
        <p className="text-muted-foreground">Decode timestamps hidden in social media IDs. Convert Facebook fbid timestamps or Twitter Snowflake IDs to actual dates and times.</p>
      </header>
      <div className="mt-8"><SocialMediaTimestampConverter /></div>
      <div className="mt-16"><SocialMediaTimestampConverterSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
