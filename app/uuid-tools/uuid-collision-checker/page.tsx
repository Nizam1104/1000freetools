import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidCollisionChecker from "@/components/uuid-tools/uuid-collision-checker";
import UuidCollisionCheckerSEO from "@/components/seo-content/uuid-tools/uuid-collision-checker";

export const metadata: Metadata = {
  title: `UUID Collision Checker | Find Duplicate UUIDs`,
  description: `Check a list of UUIDs for duplicates. Find collisions in your dataset instantly. Upload a file or paste a list to ensure all your identifiers are unique.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-collision-checker`,
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

export default function UuidCollisionCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          UUID Duplicate Finder & Collision Checker
        </h1>
        <p className="text-muted-foreground">
          Upload or paste a list of UUIDs to check for accidental duplicates.
          This tool quickly scans thousands of identifiers, highlights any
          collisions, and reports the total count of unique values, ensuring
          data integrity.
        </p>
      </header>
      <div className="mt-8">
        <UuidCollisionChecker />
      </div>
      <div className="mt-8">
        <UuidCollisionCheckerSEO />
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
