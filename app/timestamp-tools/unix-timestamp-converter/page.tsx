import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UnixTimestampConverter from "@/components/timestamp-tools/unix-timestamp-converter";
import UnixTimestampConverterSeo from "@/components/seo-content/timestamp-tools/unix-timestamp-converter";

export const metadata: Metadata = {
  title: `Unix Timestamp Converter | Free Online Tool`,
  description: `Convert Unix timestamps to human-readable dates and back. Supports milliseconds, timezones, and custom formats. Fast, free, and no registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/unix-timestamp-converter`,
  },
};

const tools = [
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

export default function UnixTimestampConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Unix Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Instantly convert Unix timestamps to readable dates and times. This
          free tool handles seconds and milliseconds, works in any timezone, and
          lets you format dates your way. Get the current timestamp with one
          click.
        </p>
      </header>
      <div className="mt-8">
        <UnixTimestampConverter />
      </div>
      <div className="mt-8">
        <UnixTimestampConverterSeo />
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
