import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidDecoder from "@/components/uuid-tools/uuid-decoder";
import UuidDecoderSEO from "@/components/seo-content/uuid-tools/uuid-decoder";

export const metadata: Metadata = {
  title: `UUID Decoder | Analyze UUID Version & Timestamp`,
  description: `Decode and analyze any UUID. Identify its version, variant, and extract the creation timestamp for v1 UUIDs. Understand the structure of your unique identifiers.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-decoder`,
  },
};

const tools = [
  {
    name: `UUID Generator`,
    description: `Free UUID Generator`,
    href: `/uuid-tools/uuid-generator`,
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

export default function UuidDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UUID Decoder & Analyzer</h1>
        <p className="text-muted-foreground">
          Paste any UUID to decode its structure and extract hidden information.
          This tool identifies the UUID version (1-5), variant, and for
          time-based UUIDs, reveals the precise creation timestamp and
          originating machine details.
        </p>
      </header>
      <div className="mt-8">
        <UuidDecoder />
      </div>
      <div className="mt-8">
        <UuidDecoderSEO />
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
