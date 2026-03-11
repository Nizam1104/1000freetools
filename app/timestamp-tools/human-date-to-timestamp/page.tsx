import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HumanDateToTimestamp from "@/components/timestamp-tools/human-date-to-timestamp";
import HumanDateToTimestampSeo from "@/components/seo-content/timestamp-tools/human-date-to-timestamp";

export const metadata: Metadata = {
  title: `Human Date to Timestamp | Free Converter Tool`,
  description: `Convert human-readable dates and times to Unix timestamps. Supports natural language input and multiple date formats. Quick and accurate conversion.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/human-date-to-timestamp`,
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

export default function HumanDateToTimestampPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Human Date to Timestamp Converter
        </h1>
        <p className="text-muted-foreground">
          Turn phrases like 'tomorrow 2 PM' or '2024-12-25' into a precise Unix
          timestamp. This tool understands natural language and standard date
          formats, making conversion effortless.
        </p>
      </header>
      <div className="mt-8">
        <HumanDateToTimestamp />
      </div>
      <div className="mt-8">
        <HumanDateToTimestampSeo />
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
