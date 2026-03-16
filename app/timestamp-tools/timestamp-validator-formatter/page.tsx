import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TimestampValidatorFormatter from "@/components/timestamp-tools/timestamp-validator-formatter";
import TimestampValidatorFormatterSeo from "@/components/seo-content/timestamp-tools/timestamp-validator-formatter";

export const metadata: Metadata = {
  title: `Timestamp Validator & Formatter | Check & Format Tool`,
  description: `Validate Unix timestamps and format them into various date-time strings. Check timestamp validity and customize output format online.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/timestamp-validator-formatter`,
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

export default function TimestampValidatorFormatterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Timestamp Validator & Formatter
        </h1>
        <p className="text-muted-foreground">
          Check if a number is a valid timestamp and then format it beautifully.
          This tool validates the range and lets you choose from dozens of
          output formats.
        </p>
      </header>
      <div className="mt-8">
        <TimestampValidatorFormatter />
      </div>
      <div className="mt-8">
        <TimestampValidatorFormatterSeo />
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
