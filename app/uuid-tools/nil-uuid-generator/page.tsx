import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import NilUuidGenerator from "@/components/uuid-tools/nil-uuid-generator";
import NilUuidGeneratorSEO from "@/components/seo-content/uuid-tools/nil-uuid-generator";

export const metadata: Metadata = {
  title: `Nil UUID Generator | Create Empty UUID Pattern`,
  description: `Generate the nil UUID (all zeros) or create a custom UUID from a hex pattern. Essential for representing uninitialized values or specific testing scenarios.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/nil-uuid-generator`,
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

export default function NilUuidGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Nil UUID & Custom Pattern Generator
        </h1>
        <p className="text-muted-foreground">
          Generate the special nil UUID (all zeros) or create a UUID from any
          hex pattern you define. Useful for representing empty values,
          placeholders in system design, or creating specific identifier
          patterns for testing.
        </p>
      </header>
      <div className="mt-8">
        <NilUuidGenerator />
      </div>
      <div className="mt-8">
        <NilUuidGeneratorSEO />
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
