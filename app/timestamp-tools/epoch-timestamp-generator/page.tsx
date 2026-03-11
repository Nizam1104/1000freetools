import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TimestampEpochGenerator from "@/components/timestamp-tools/epoch-timestamp-generator";
import EpochTimestampGeneratorSeo from "@/components/seo-content/timestamp-tools/epoch-timestamp-generator";

export const metadata: Metadata = {
  title: `Epoch Timestamp Generator | Create Timestamps Online`,
  description: `Generate epoch timestamps from any date and time. Input a date, pick a timezone, and get the timestamp in seconds or milliseconds instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/epoch-timestamp-generator`,
  },
};

const tools = [
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
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
    name: `Timezone Timestamp Converter`,
    description: `Timezone Timestamp Converter`,
    href: `/timestamp-tools/timezone-timestamp-converter`,
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

export default function EpochTimestampGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Epoch Timestamp Generator</h1>
        <p className="text-muted-foreground">
          Need a timestamp for a specific date? Generate epoch timestamps in
          seconds or milliseconds from any calendar date and time. Perfect for
          coding, logging, or scheduling tasks.
        </p>
      </header>
      <div className="mt-8">
        <TimestampEpochGenerator />
      </div>
      <div className="mt-8">
        <EpochTimestampGeneratorSeo />
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
