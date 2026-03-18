import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Rfc28223339TimestampConverter from "@/components/timestamp-tools/rfc-2822-3339-timestamp-converter";
import RfcTimestampConverterSeo from "@/components/seo-content/timestamp-tools/rfc-timestamp-converter";

export const metadata: Metadata = {
  title: `RFC 2822 & RFC 3339 Timestamp Converter | Internet Date Tools`,
  description: `Convert Unix timestamps to RFC 2822 and RFC 3339 date formats and vice versa. Validate and format standard internet date strings.`,
  alternates: {
    canonical: `https://1000freetools.com/timestamp-tools/rfc-timestamp-converter`,
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

export default function RfcTimestampConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">RFC 2822 & RFC 3339 Timestamp Converter</h1>
        <p className="text-muted-foreground">Convert timestamps to email-friendly RFC 2822 or internet-standard RFC 3339 formats. Essential for parsing dates from emails, HTTP headers, and APIs.</p>
      </header>
      <div className="mt-8"><Rfc28223339TimestampConverter /></div>
      <div className="mt-16"><RfcTimestampConverterSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
