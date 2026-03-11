import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TimestampToReadableDate from "@/components/timestamp-tools/timestamp-to-readable-date";
import TimestampToReadableDateSeo from "@/components/seo-content/timestamp-tools/timestamp-to-readable-date";

export const metadata: Metadata = {
  title: `Timestamp to Readable Date | Free Decoder Tool`,
  description: `Decode timestamps into human-readable dates. Supports custom formats, timezones, and outputs like ISO 8601. Convert instantly online.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/timestamp-to-readable-date`,
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

export default function TimestampToReadableDatePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Timestamp to Human Readable Date
        </h1>
        <p className="text-muted-foreground">
          Decode any numeric timestamp into a clear date and time. This
          converter offers multiple output formats and timezone adjustments,
          making timestamps easy to understand.
        </p>
      </header>
      <div className="mt-8">
        <TimestampToReadableDate />
      </div>
      <div className="mt-8">
        <TimestampToReadableDateSeo />
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
