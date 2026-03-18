import type { Metadata } from "next";
import UuidTimestampToDateSeo from "@/components/seo-content/uuid-tools/uuid-timestamp-to-date";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { UuidTimestampToDate } from "@/components/uuid-tools/uuid-timestamp-to-date";

export const metadata: Metadata = {
  title: `UUID Timestamp to Date | Extract Time from UUID v1`,
  description: `Extract the creation timestamp from a UUID version 1. Convert the 100-nanosecond counter since 1582 into a human-readable date and time instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-timestamp-to-date`,
  },
};

const tools = [
  {
    name: `UUID Generator`,
    description: `Free UUID Generator`,
    href: `/uuid-tools/uuid-generator`,
  },
  {
    name: `UUID Decoder`,
    description: `UUID Decoder & Analyzer`,
    href: `/uuid-tools/uuid-decoder`,
  },
  {
    name: `UUID Validator`,
    description: `UUID Validator & Checker`,
    href: `/uuid-tools/uuid-validator`,
  },
  {
    name: `UUID Version Converter`,
    description: `UUID Version Converter (v3, v5)`,
    href: `/uuid-tools/uuid-version-converter`,
  },
  {
    name: `Bulk UUID Generator`,
    description: `Bulk UUID Generator for Mass Production`,
    href: `/uuid-tools/bulk-uuid-generator`,
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

export default function UuidTimestampToDatePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Extract Date from UUID v1 Timestamp</h1>
        <p className="text-muted-foreground">UUID version 1 contains a precise creation timestamp. This tool extracts that timestamp from any v1 UUID and converts it to a readable date and time, showing both UTC and your local time zone.</p>
      </header>
      {<UuidTimestampToDate />}
      <div className="mt-16">
        <UuidTimestampToDateSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
