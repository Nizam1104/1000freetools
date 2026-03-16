import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidSortOrganize from "@/components/uuid-tools/uuid-sort-organize";
import UuidSortOrganizeSEO from "@/components/seo-content/uuid-tools/uuid-sort-organize";

export const metadata: Metadata = {
  title: `UUID Sorter | Organize & Sort UUID Lists`,
  description: `Sort lists of UUIDs alphabetically or by timestamp. Organize and clean your identifier data, remove duplicates, and export the sorted results.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-sort-organize`,
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

export default function UuidSortOrganizePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          UUID List Sorter & Organizer
        </h1>
        <p className="text-muted-foreground">
          Paste a list of UUIDs and sort them alphabetically or by embedded
          timestamp (for v1). This tool helps organize and clean identifier
          lists, with options to remove duplicates and add sequence numbers.
        </p>
      </header>
      <div className="mt-8">
        <UuidSortOrganize />
      </div>
      <div className="mt-8">
        <UuidSortOrganizeSEO />
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
