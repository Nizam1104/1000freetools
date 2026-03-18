import type { Metadata } from "next";
import UuidVersionConverterSeo from "@/components/seo-content/uuid-tools/uuid-version-converter";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { UuidVersionConverter } from "@/components/uuid-tools/uuid-version-converter.tsx";

export const metadata: Metadata = {
  title: `UUID Version Converter | Generate v3/v5 UUIDs`,
  description: `Convert to UUID v3 or v5. Create deterministic UUIDs using MD5 or SHA-1 hashing from a namespace (like DNS) and a name. Essential for reproducible identifiers.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-version-converter`,
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
    name: `Bulk UUID Generator`,
    description: `Bulk UUID Generator for Mass Production`,
    href: `/uuid-tools/bulk-uuid-generator`,
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

export default function UuidVersionConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UUID Version Converter (v3, v5)</h1>
        <p className="text-muted-foreground">Generate version 3 (MD5) or version 5 (SHA-1) UUIDs from a namespace and a name. This tool creates deterministic UUIDs, perfect for generating consistent identifiers for the same input across different systems.</p>
      </header>
      {<UuidVersionConverter />}
      <div className="mt-16">
        <UuidVersionConverterSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
