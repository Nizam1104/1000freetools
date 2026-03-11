import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BatchTimestampConverter from "@/components/timestamp-tools/batch-timestamp-converter";
import BatchTimestampConverterSeo from "@/components/seo-content/timestamp-tools/batch-timestamp-converter";

export const metadata: Metadata = {
  title: `Batch Timestamp Converter | Convert Multiple Timestamps`,
  description: `Convert multiple Unix timestamps to dates in bulk. Paste a list, get formatted results. Handles CSV data. Free batch processing tool.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/batch-timestamp-converter`,
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

export default function BatchTimestampConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Batch Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Convert a whole list of timestamps in one go. Perfect for processing
          log files or datasets. Paste your timestamps and get formatted dates
          instantly.
        </p>
      </header>
      <div className="mt-8">
        <BatchTimestampConverter />
      </div>
      <div className="mt-8">
        <BatchTimestampConverterSeo />
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
