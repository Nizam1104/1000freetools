import type { Metadata } from "next";
import UuidV1GeneratorSeo from "@/components/seo-content/uuid-tools/uuid-v1-generator";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { UuidV1Generator } from "@/components/uuid-tools/uuid-v1-generator";

export const metadata: Metadata = {
  title: `UUID v1 Generator | Create Time-Based UUIDs`,
  description: `Generate UUID version 1 (time-based) identifiers. Create UUIDs that embed a timestamp and are sortable by creation time. Choose between MAC address or random node IDs.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-v1-generator`,
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

export default function UuidV1GeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UUID Version 1 Generator (Time-Based)</h1>
        <p className="text-muted-foreground">Create UUID version 1 identifiers, which embed a precise timestamp and traditionally a network card address. This tool generates time-ordered UUIDs, useful for scenarios where sortable, time-based unique identifiers are required.</p>
      </header>
      {<UuidV1Generator />}
      <div className="mt-16">
        <UuidV1GeneratorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
