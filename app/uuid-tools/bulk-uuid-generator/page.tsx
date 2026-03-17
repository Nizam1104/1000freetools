import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { BulkUuidGenerator } from "@/components/uuid-tools/bulk-uuid-generator.tsx";

export const metadata: Metadata = {
  title: `Bulk UUID Generator | Create Millions of UUIDs`,
  description: `Generate massive lists of UUIDs instantly. Create thousands or millions of random UUIDs (v4) for testing and data seeding. Export to CSV, JSON, or SQL.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/bulk-uuid-generator`,
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
    name: `Nil/Empty UUID Generator`,
    description: `Nil UUID & Custom Pattern Generator`,
    href: `/uuid-tools/nil-uuid-generator`,
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

export default function BulkUuidGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Bulk UUID Generator for Mass Production</h1>
        <p className="text-muted-foreground">Need thousands or millions of UUIDs? This bulk generator creates massive lists of random UUIDs (v4) for database seeding, testing, or data migration. Export directly to CSV, JSON, or SQL formats.</p>
      </header>
      {<BulkUuidGenerator />}
      {/* TODO: add seo component for bulk-uuid-generator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
