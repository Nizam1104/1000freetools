import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Offline UUID Generator | Private, Client-Side Tool`,
  description: `Generate UUIDs offline in your browser. A 100% client-side tool that guarantees privacy—your data never leaves your computer. No internet required after page load.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/offline-uuid-generator`,
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

export default function OfflineUuidGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Client-Side Offline UUID Generator</h1>
        <p className="text-muted-foreground">Generate UUIDs completely offline in your browser. This tool uses JavaScript to create identifiers locally, ensuring maximum privacy and security as no data ever leaves your computer. Works without an internet connection.</p>
      </header>
      {/* TODO: add tool component for offline-uuid-generator */}
      {/* TODO: add seo component for offline-uuid-generator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
